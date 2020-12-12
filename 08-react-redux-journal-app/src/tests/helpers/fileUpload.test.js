import '@testing-library/jest-dom';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'uploadedimage', 
    api_key: '239187633572514', 
    api_secret: 'fmFzv_zCWfda8LTGfPayoeq3u_g' 
  });

describe('Pueba en fileUpload', () => {
    test('debe de cargar un archivo y retornar una url', async(done) => {
        const resp = await fetch('https://pbs.twimg.com/profile_images/687354253371772928/v9LlvG5N.jpg');
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length -1].replace('.jpg', '');
        cloudinary.v2.api.delete_resources(imageId, {}, () => done());
    });
    test('debe de retornar un error', async() => {
        const file = new File([], 'photo.png');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    })
    
    
});
