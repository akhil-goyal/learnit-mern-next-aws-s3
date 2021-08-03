import AWS from 'aws-sdk';
import slugify from 'slugify';
import { nanoid } from 'nanoid';
import Course from './../models/course';
import { readFileSync } from 'fs';

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION
}

const S3 = new AWS.S3(awsConfig);


export const uploadImage = async (req, res) => {

    try {

        const { image } = req.body;

        if (!image) return res.status(400).send('No Image');

        // Just retaining the base64 & getting rid of
        // other image data.
        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), "base64");

        const type = image.split(';')[0].split('/')[1];

        // Image parameters
        const params = {
            Bucket: 'learnit-mern-bucket',
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${type}`
        }

        // Upload to S3
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }
            console.log(data);
            res.send(data);
        })

    } catch (err) {
        console.log(err);
    }

}

export const removeImage = async (req, res) => {

    try {

        const { image } = req.body;

        // Image parameters
        const params = {
            Bucket: image.Bucket,
            Key: image.Key
        }

        // Sending deletion request to S3
        S3.deleteObject(params, (err, data) => {

            if (err) {
                console.log(err);
                res.sendStatus(400);
            }

            res.send({ ok: true });
        });

    } catch (err) {
        console.log(err);
    }

}

export const create = async (req, res) => {

    try {

        const alreadyExist = await Course.findOne({
            slug: slugify(req.body.name.toLowerCase())
        });

        if (alreadyExist) return res.status(400).send('Sorry, this title is already taken.');

        const course = await new Course({
            slug: slugify(req.body.name),
            instructor: req.user._id,
            ...req.body
        }).save();

        res.json(course);

    } catch (err) {
        console.log(err);
        return res.status(400).send('Course creation failed! Try again..');
    }

}

export const read = async (req, res) => {

    try {

        const course = await Course.findOne({ slug: req.params.slug }).populate('instructor', '_id name').exec();

        res.json(course);

    } catch (err) {
        console.log(err);
    }

}

export const uploadVideo = async (req, res) => {

    try {

        if (req.user._id != req.params.instructorId) {
            res.status(400).send('Unauthorized!');
        }

        const { video } = req.files;
        console.log(video);

        if (!video) return res.status(400).send('No video!');

        // Video params
        const params = {
            Bucket: 'learnit-mern-bucket',
            Key: `${nanoid()}.${video.type.split('/')[1]}`,
            Body: readFileSync(video.path),
            ACL: 'public-read',
            ContentType: video.type,
        }

        // Upload to S3
        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }
            console.log(data);
            res.send(data);
        });

    } catch (err) {
        console.log(err);
    }

}

export const removeVideo = async (req, res) => {

    try {

        if (req.user._id != req.params.instructorId) {
            res.status(400).send('Unauthorized!');
        }

        const { Bucket, Key } = req.body;

        // Video params
        const params = {
            Bucket,
            Key
        }

        // Upload to S3
        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            }
            console.log(data);
            res.send({ ok: true });
        });

    } catch (err) {
        console.log(err);
    }

}