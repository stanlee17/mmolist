const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const {
  storageBucketUpload,
  deleteFileFromBucket,
  getFileFromUrl,
} = require('../utilities/bucketServices');
const debugWRITE = require('debug')('app:write');
const debugREAD = require('debug')('app:read');

// Capitalizes first letter function
const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

module.exports = {
  // GET ALL GAMES
  async getAllGames(req, res, next) {
    try {
      const gamesRef = db.collection('games');
      const snapshot = await gamesRef.orderBy('rating', 'desc').get();
      // const snapshot = await gamesRef.orderBy('rating', 'desc').limit(1).get();
      // const snapshot = await gamesRef
      //   .orderBy('rating', 'desc')
      //   .where('status', '==', 'Development')
      //   .get();

      // [400 ERROR] Check for users asking for non-existent docs
      if (snapshot.empty) {
        return next(
          ApiError.badRequest('The games you were looking for do not exist')
        );

        // SUCCESS GET REQUEST: Structure the data for client
      } else {
        let docs = [];
        snapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            title: doc.data().title,
            classification: doc.data().classification,
            description: doc.data().description,
            status: doc.data().status,
            release_date: doc.data().release_date,
            rating: doc.data().rating,
            engine: doc.data().engine,
            developer: doc.data().developer,
            trailer: doc.data().trailer,
            createdBy: doc.data().createdBy,
            cover_image: doc.data().cover_image,
            background_image: doc.data().background_image,
          });
        });

        res.send(docs);
      }
    } catch (err) {
      return next(
        ApiError.internal('The games cannot be retrieved at this time', err)
      );
    }
  },

  // POST GAMES
  async postGames(req, res, next) {
    // Testing data posted to server
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    // File Upload to Storage Bucket
    let downloadURL = { cover_image: null, background_image: null };
    try {
      for (const key in res.locals) {
        const images = res.locals[key];
        downloadURL[key] = await storageBucketUpload(images);
      }
    } catch (err) {
      return next(
        ApiError.internal(
          'An error occured in uploading the cover image to storage',
          err
        )
      );
    }

    // Store games document query in variable & call ADD method
    try {
      const gamesRef = db.collection('games');
      const response = await gamesRef.add({
        title: capitalizeFirstLetter(req.body.title),
        classification: req.body.classification,
        description: capitalizeFirstLetter(req.body.description),
        status: req.body.status,
        release_date: Number(req.body.release_date),
        rating: Number(req.body.rating),
        engine: capitalizeFirstLetter(req.body.engine),
        developer: capitalizeFirstLetter(req.body.developer),
        trailer: req.body.trailer,
        createdBy: req.body.createdBy,
        cover_image: downloadURL.cover_image,
        background_image: downloadURL.background_image,
      });

      console.log(`Added Games with ID: ${response.id}`);
      res.send(response.id);
    } catch (err) {
      return next(
        ApiError.internal('Your request could not be saved at this time', err)
      );
    }
  },

  // GET Games BY ID
  async getGamesById(req, res, next) {
    debugREAD(req.params);

    try {
      const gamesRef = db.collection('games').doc(req.params.id);
      const doc = await gamesRef.get();

      if (!doc.exists) {
        return ApiError.badRequest(
          'The MMORPG you were looking for does not exist',
          err
        );
      } else {
        res.send(doc.data());
      }
    } catch (err) {
      ApiError.internal('Your request could not be saved at this time', err);
    }
  },

  // PUT - Update Games By Id
  async putGamesById(req, res, next) {
    debugWRITE(req.params);
    debugWRITE(req.body);
    debugWRITE(req.files);
    debugWRITE(res.locals);

    let downloadURL = { cover_image: null, background_image: null };
    try {
      if (req.files) {
        for (const key in res.locals) {
          const images = res.locals[key];

          if (images) {
            downloadURL[key] = await storageBucketUpload(images);
          }
        }

        const uploadedFiles = {
          cover_image: req.body.uploadedFileCover,
          background_image: req.body.uploadedFileBackground,
        };

        // NEW - Delete old images version in storage (if it exists)
        if (!req.body.cover_image && !req.body.background_image) {
          const bucketResponseCover = await deleteFileFromBucket(
            uploadedFiles.cover_image
          );
          const bucketResponseBackground = await deleteFileFromBucket(
            uploadedFiles.background_image
          );
        } else if (!req.body.background_image) {
          const bucketResponse = await deleteFileFromBucket(
            uploadedFiles.background_image
          );
        } else if (!req.body.cover_image) {
          const bucketResponse = await deleteFileFromBucket(
            uploadedFiles.cover_image
          );
        }
      } else if (req.body.cover_image && req.body.background_image) {
        console.log('No change to cover image and or background image in DB');
        downloadURL.cover_image = req.body.cover_image;
        downloadURL.background_image = req.body.background_image;
      } else {
        return next(
          ApiError.badRequest(
            'The file you are trying to uploaded cannot be edited',
            err
          )
        );
      }
    } catch (err) {
      return next(
        ApiError.internal(
          'An error occured in uploading the image to storage',
          err
        )
      );
    }

    // Store games document query in variable
    try {
      const gamesRef = db.collection('games').doc(req.params.id);
      const response = await gamesRef.update({
        title: capitalizeFirstLetter(req.body.title),
        classification: req.body.classification,
        description: capitalizeFirstLetter(req.body.description),
        status: req.body.status,
        release_date: Number(req.body.release_date),
        rating: Number(req.body.rating),
        engine: capitalizeFirstLetter(req.body.engine),
        developer: capitalizeFirstLetter(req.body.developer),
        trailer: req.body.trailer,
        createdBy: req.body.createdBy,
        cover_image: !downloadURL.cover_image
          ? req.body.cover_image
          : downloadURL.cover_image,
        background_image: !downloadURL.background_image
          ? req.body.background_image
          : downloadURL.background_image,
      });

      res.send(response);
    } catch (err) {
      return next(
        ApiError.internal('Your request could not be saved at this time', err)
      );
    }
  },

  // DELETE GAMES BY ID
  async deleteGamesById(req, res, next) {
    debugWRITE(req.params);

    try {
      // Obtain the document to be deleted
      const gamesRef = db.collection('games').doc(req.params.id);
      const doc = await gamesRef.get();

      // 400 ERROR: Doc id exists
      if (!doc.exists) {
        return next(
          ApiError.badRequest('The games you were looking for does not exist')
        );
      }

      // Delete the uploaded file in cloud storage
      const downloadURL = doc.data().cover_image;
      const uploadedFile = getFileFromUrl(downloadURL);
      const bucketResponse = await deleteFileFromBucket(uploadedFile);

      // Delete document from cloud firestore
      if (bucketResponse) {
        const response = await gamesRef.delete({ exists: true });
        res.send(response);
      }
    } catch (err) {
      return next(
        ApiError.internal('Your request could not be queried at this time', err)
      );
    }
  },
};
