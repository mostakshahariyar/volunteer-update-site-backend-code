import cloudinary from 'cloudinary';
console.log(process.env.PORT)
// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: "mostakshahariyar",
    api_key: "548443337817757",
    api_secret: "HSIW6TuOs2Ci3yIjt7jsBdNmDp8"
});

export default cloudinary.v2;
