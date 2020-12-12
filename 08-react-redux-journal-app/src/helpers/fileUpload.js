export const fileUpload = async (file) =>  {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/uploadedimage/upload';
    const fromData = new FormData();
    fromData.append('upload_preset', 'react-journal');
    fromData.append('file', file);
    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: fromData
        });
        if(resp.ok) {
            const cloundResp = await resp.json();
            return cloundResp.secure_url;
        }else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}