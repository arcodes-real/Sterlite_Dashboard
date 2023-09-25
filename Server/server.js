const express = require('express');
const app = express();
const cors = require('cors');
const port = 7000;
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIA24ADS5JH6NXSW3IR',
    secretAccessKey: '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',
    region: 'ap-south-1'
  });

// creating the aws s3 instance  
  const s3 = new AWS.S3();

// enabling cors and express  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended : true })); 


// code to post an image to the s3 bucket

app.post("/copyImage", async(req, res) =>{
    try{
        const { defect, customDefect, identifier } = req.body; // defect and imageUrl parameters are requested/fetched from the body,i.e, from the FE
        console.log(customDefect);
        if(defect === "Others" && customDefect){

            // we need to use the custom defect name as the folder name inside the Others folder

            const bucketName = 'cvsterlite';
            const fileName = identifier.split('/').pop(); //getting the filename: timestamp_ROUND.jpg
            const identifierArray = identifier.split('/');
            const identifierJetson = identifierArray[identifierArray.length - 4];
            const identifierDate = identifierArray[identifierArray.length - 3];
            
            // construct the sourceKey and targetKey

            const sourceKey = `Sterlite_Deployment/dashboard/${identifierJetson}/${identifierDate}//${fileName}`;
            console.log("Source Key",sourceKey);
            const targetKey = `Sterlite_Deployment/Seggregation/${defect}/${customDefect}/${fileName}`;

            const copyParams = {
                Bucket: bucketName,
                CopySource: `${bucketName}/${sourceKey}`,
                Key: targetKey,
            };

            await s3.copyObject(copyParams).promise();

            res.status(200).json({ message: "Image copied Successfully" });
        }
    // check for invalid defects
    
    else if(!["Patch","Dent","Loose Wire","Black Wire"].includes(defect)){
        return res.status(400).json({error: 'Invalid Defect'});
    } else{
            // defining the s3 bucket

    const bucketName = 'cvsterlite';

    // Extract the file name from the image URL
    const fileName = identifier.split('/').pop();
    const identifierArray = identifier.split('/');
    const identifierJetson = identifierArray[identifierArray.length - 4];
    const identifierDate = identifierArray[identifierArray.length - 3];


    // construct the sourceKey and targetKey
    
    const sourceKey = `Sterlite_Deployment/dashboard/${identifierJetson}/${identifierDate}//${fileName}`;
    console.log("Source Key",sourceKey);
    const targetKey = `Sterlite_Deployment/Seggregation/${defect}/${fileName}`;
    console.log(targetKey);
    // Copy the image from the source to the target location

    const copyParams = {
        Bucket : bucketName,
        CopySource : `${bucketName}/${sourceKey}`,
        Key : targetKey,
    };

    await s3.copyObject(copyParams).promise();

    res.status(200).json({ message: "Image copied Succesfully" });
    }


    } catch(error){
        console.error("Error copying image", error);
        res.status(500).json({ error: 'Internal Server Error'});
        // console.log("Error Status",res.statusCode);
    }
    

});

// app.post('/moveImage', async(req, res) =>{
//     try{
//         const {identifier} = req.body;
// // define the s3 bucket
//         const bucketName = 'cvsterlite';

// // Extract the file name from the image URL
//     const fileName = identifier.split('/').pop();
//     const identifierArray = identifier.split('/');
//     const identifierJetson = identifierArray[identifierArray.length - 4];
//     const identifierDate = identifierArray[identifierArray.length - 3];

// // construct the sourcekey and targetkey

//         const sourceKey = `Sterlite_Deployment/dashboard/${identifierJetson}/${identifierDate}//${fileName}`;
//         const targetKey = `Sterlite_Deployment/dashboard/Deleted/${fileName}`;
        
//         const copyParams ={
//             Bucket: bucketName,
//             CopySource: `${bucketName}/${sourceKey}`,
//             Key: targetKey,
//         };

//         await s3.copyObject(copyParams).promise();

//         // delete the original image from the source folder
//         await s3.deleteObject({Bucket: bucketName, Key: sourceKey }).promise();

//         res.status(200).json({ message: "Image copied Succesfully" });
//     } catch(error){
//         console.error("Error moving image", error);
//         res.status(500).json({ error: 'Intrenal Server Error '});
//     }
// });

// code to get a specific image from the bucket based on the get request parameters
  app.get('/image/:jetson/:date', (req, res) =>{
        const { jetson, date } = req.params;
        // const shiftInfo = shifts[shift];

        const bucketName = 'cvsterlite';
        // const timeString = `${shiftInfo.startTime}-${shiftInfo.endTime}`;

        const fileKey = `Sterlite_Deployment/dashboard/${jetson}/${date}/`;
        

        const params = {
            Bucket: bucketName,
            Key: fileKey,
            
            // ContentType: "application/json",
        };

        // Set CORS Headers

        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'
        );

        s3.getObject(params, (err, data) =>{
            if(err){
                console.error('Error fetching image:', err);
                res.status(404).json({ error: 'File not found' });
            } else{
                res.contentType(data.ContentType);
                res.send(data.Body);
            }
        });
  });

// code to get the list of images from the bucket based on the get request parameters
  app.get('/images/:jetson/:date', (req, res) =>{
    const { jetson, date } = req.params;
    const bucketName = 'cvsterlite';
    // const shiftInfo = shifts[shift];
    // const timeString = `${shiftInfo.startTime}-${shiftInfo.endTime}`;

    const prefix = `Sterlite_Deployment/dashboard/${jetson}/${date}/`;

    const params = {
        Bucket: bucketName,
        Prefix: prefix
    };

    s3.listObjectsV2(params, (err, data) =>{
        if(err){
            console.error('Error listing objects:', err);
            res.status(500).json({ error : 'Internal Server Error' });
        } else{
            const imageKeys = data.Contents.map(objects => objects.Key);
            res.json({ images: imageKeys });
        }
    });
  });

  app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
  });

   









































// const { S3Client, GetObjectCommand, HeadObjectCommand, CopyObjectCommand} = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


// // creating an instance of the AWS S3 service Client from the AWS SDK
// const s3Client =  new S3Client({
//     region: "ap-south-1",
//     credentials:{
//         accessKeyId: 'AKIA24ADS5JH6NXSW3IR',
//         secretAccessKey: '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'
//     },
// });

// async function getObjectURL(key){
//     const command = new GetObjectCommand({
//         Bucket: "cvsterlite",
//         Key: key,
//     });
//     const url = await getSignedUrl(s3Client, command);
//     return url;
// }

// // Content disposition typically refers to an HTTP header that provides information on how to handle the content
// // being transferred in a response. It's often used for specifying whether the content should be displayed inline in
// //  the browser or treated as an attachment.
// async function updateContentDisposition(key){
//     const headObjectCommand = new HeadObjectCommand({
//         Bucket: "cvsterlite",
//         Key: key,
//     });
//     try{
//         const { Metadata} = await s3Client.send(headObjectCommand);
//         Metadata["Content-Disposition"] = "inline";

//         const copyCommand = new CopyObjectCommand({
//             Bucket: "cvsterlite",
//             CopySource: "cvsterlite/"+ key,
//             Key: key,
//             MetadataDirective: "REPLACE",
//             Metadata: Metadata,
//             ContentType: "image/jpg",
//         });

//         await s3Client.send(copyCommand);
//         console.log("Content-Disposition updated for", key);
//     } catch(error){
//         console.error("Error updating Content-Disposition", error);
//     }
// }



// async function init(){
//     const key = "Sterlite_Deployment/dashboard/jetson1/2023-07-03//13-09-12_ROUND.jpg";
//     console.log("URL for first image:",await getObjectURL(key));
//     await updateContentDisposition(key);
//     // const contentType = "image/jpg";
//     // await uploadImageAndGenerateURL(key, contentType);
// }

// init();


// break

// const express = require('express');
// const app = express();
// const port = 7000;
// const cors = require('cors');
// const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: 'AKIA24ADS5JH6NXSW3IR',
//     secretAccessKey: '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',
//     region: 'ap-south-1'
// });

// const s3 = new AWS.S3();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended:true }));

// app.get('/data/:date', (req, res) =>{

// })

// const params = {
//     Bucket: 'cvsterlite',
// }



// async function uploadImageAndGenerateURL(key, contentType){
//     const uploadCommand = new PutObjectAclCommand({
//         Bucket: "cvsterlite",
//         Key: key,
//         ACL: "public-read",
//         ContentType: "image/jpg",
//     });

//     try{
//         await s3Client.send(uploadCommand);
//         console.log("image uploaded successfully");

//         const signedURL = await getSignedUrl(s3Client, {
//             command: new GetObjectCommand({
//                 Bucket: "cvsterlite",
//                 Key: key,
                
//             }),
//             expiresIn: 3600,
//         });
//         console.log("Signed URL:", signedURL );
//     } catch(err){
//         console.error("Error uploading image:",err);
//     }
// }


// app.post("/moveImage", async (req, res) => {
//     try {
//         const { sourceKey, targetKey } = req.body;

//         const bucketName = 'cvsterlite';

//         // Copy the image from the source to the target location
//         const copyParams = {
//             Bucket: bucketName,
//             CopySource: `${bucketName}/${sourceKey}`,
//             Key: targetKey,
//         };

//         await s3.copyObject(copyParams).promise();

//         // Delete the image from the source location
//         const deleteParams = {
//             Bucket: bucketName,
//             Key: sourceKey,
//         };

//         await s3.deleteObject(deleteParams).promise();

//         res.status(200).json({ message: "Image moved successfully" });
//     } catch (error) {
//         console.error("Error moving image", error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
