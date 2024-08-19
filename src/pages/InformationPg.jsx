import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import InfoBox from '../components/InfoBox'
import NavBar from '../components/NavBar'
import Spinner from '../components/Spinner'

const InformationPg = ({photo=null, apiKey='', manualLocation}) => {
  //const photoUrl = photo;
  const location = manualLocation;
  const photoUrl = "https://yellowstonenaturalist.com/wp-content/uploads/2020/01/Beehive140608J1090591H.jpg"
  const OPENAI_API_KEY = apiKey;
  const [information, setInformation] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      const successCallback = (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      };
      const errorCallback = (error) => {
        reject(error.message);
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
          enableHighAccuracy: true
        });
      }
    });
  };

  useEffect(() => {
    const fetchInfo = async() => {
      //const coords = await getCoordinates()
      const coords = [44.4629, -110.8298] 
      const attraction_coords = `Abyss Pool: (44.471944, -110.828056);
            Anemone Geysers: (44.460556, -110.828056);
            Beehive Geyser: (44.460556, -110.831667);
Blood Geyser: (44.460556, -110.828056);
Canary Spring: (44.976944, -110.701667);
Castle Geyser: (44.462222, -110.831667);
Crested Pool: (44.460556, -110.828056);
Daisy Geyser: (44.460556, -110.828056);
Dragon's Mouth Spring: (44.621389, -110.434722);
Emerald Spring: (44.462222, -110.831667);
Excelsior Geyser Crater: (44.524722, -110.837778);
Firehole River: (44.462222, -110.831667);
Fishing Cone: (44.462222, -110.831667);
Geyser Hill: (44.460556, -110.828056);
Gibbon Falls: (44.662222, -110.736667);
Grand Canyon of Yellowstone River: (44.720000, -110.496000);
Grand Geyser: (44.460556, -110.828056);
Grand Prismatic Spring: (44.524722, -110.837778);
Great Fountain Geyser: (44.462222, -110.831667);
Grotto Geyser: (44.460556, -110.828056);
Hayden Valley: (44.633333, -110.416667);
Heart Spring: (44.460556, -110.828056);
Jewel Geyser: (44.460556, -110.828056);
LeHardys Rapids: (44.633333, -110.416667);
Liberty Cap: (44.976944, -110.701667);
Lion Geyser Complex: (44.460556, -110.828056);
Morning Glory Pool: (44.460556, -110.828056);
Mud Volcano: (44.621389, -110.434722);
Obsidian Cliff: (44.733333, -110.733333);
Old Faithful: (44.460556, -110.828056);
Orange Spring Mound: (44.976944, -110.701667);
Rainbow Pool: (44.460556, -110.828056);
Red Spouter: (44.460556, -110.828056);
Sapphire Pool: (44.460556, -110.828056);
Silex Spring: (44.460556, -110.828056);
Sizzling Basin: (44.460556, -110.828056);
Spasmodic Geyser: (44.460556, -110.828056);
Steamboat Geyser: (44.725000, -110.703000);
Sulphuric Caldron: (44.621389, -110.434722);
Yellowstone Lake: (44.462222, -110.831667);
Mount Washburn: (44.797500, -110.434722);
Lower Falls: (44.720000, -110.496000);
Upper Falls: (44.720000, -110.496000);
Silver Cord Cascades: (44.720000, -110.496000);
Fountain Paint Pot: (44.524722, -110.837778);
Mammoth Hot Springs: (44.976944, -110.701667);
Midway Geyser Basin: (44.524722, -110.837778);
White Dome Geyser: (44.524722, -110.837778);
Terrace Springs: (44.976944, -110.701667);
Fairy Falls: (44.524722, -110.837778);
Firehole Falls: (44.662222, -110.736667);
Rustic Falls: (44.976944, -110.701667);
Undine Falls: (44.976944, -110.701667);
Wraith Falls: (44.976944, -110.701667);
Bunsen Peak: (44.976944, -110.701667);
Sheepeater Cliffs: (44.733333, -110.733333);
Sean Lake Flat: (44.733333, -110.733333);
Artists Paintpot: (44.524722, -110.837778);
Beryl Spring: (44.662222, -110.736667);
Monument Geyser Basin: (44.733333, -110.733333);
Porcelain Springs: (44.733333, -110.733333);
Roaring Mountain: (44.733333, -110.733333);
Norris Geyser Basin: (44.733333, -110.733333);
Virginia Cascade: (44.662222, -110.736667);
Aurum Geyser: (44.460556, -110.828056);
Biscuit Basin: (44.524722, -110.837778);
Black Sand Basin: (44.524722, -110.837778);
Ear Spring: (44.460556, -110.828056);
Giant Geyser: (44.460556, -110.828056);
Solitary Geyser: (44.460556, -110.828056);
Kepler Cascade: (44.460556, -110.828056);
Mystic Falls: (44.524722, -110.837778);
Calcite Springs: (44.733333, -110.733333);
Soda Butte: (44.733333, -110.733333);
Specimen Ridge: (44.733333, -110.733333);
West Thumb: (44.462222, -110.831667)
`;
      let manualEntryLocation = '';
      if (location != ''){
        manualEntryLocation = `In addition, the user is roughly at ${location}.`
      }

      const prompt = `This picture was taken at coordinates (${coords[0]}${coords[1]}). 
      Give 6 cool facts and/or as much details as you can about the main focus of this picture (REQUIRMENTS: Put what the main focus is in [] brackets), that should be a balance between scientific, historical, and cultural facts that would interest a knowledgeable adult. 
      Identifying what this picture is depicting, please be specific as possible about the location. If it is an attraction site, compare the picture's location/coordinates with these coordinates: ${attraction_coords} to see if it is any of those. 
      ${manualEntryLocation} If the image case 1 (depicts scenery, but isn't a known attraction) or case 2(does not depict scenery), just give the man focus and 6 facts as best you can about the place in question by looking at the picture and coordinates.`

      setIsLoading(true);
      if (photoUrl){
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                { role: "system", content: [{type: "text", text: "You are a great tour guide for tourist attractions, especially natural ones. Your goal is to give interesting facts about the image."}]
              },
                {
                  role: "user",
                  "content": [
                    {
                      type: "text",
                      text: `${prompt}`
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: `${photoUrl}`
                      }
                    }
                  ]
                }
              ],
              max_tokens: 500,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`OpenAI API error: ${error}`);
        }

        const data = await response.json();
        const notes = data.choices[0].message.content.trim();
        setInformation(notes)

        let title = (notes.slice(notes.indexOf('[')+1, notes.indexOf(']')))
        if (notes.indexOf('[') < 0){
          setTitle(notes.slice(0, notes.indexOf('1.')));
        } else {
          setTitle(title.charAt(0).toUpperCase() + title.slice(1));
        }
        setIsLoading(false);
      }
    }

    fetchInfo();
  }, [OPENAI_API_KEY, photoUrl, location])

  return (
    <>
      <NavBar cameraPage={false} />
      <div className='min-h-screen w-full bg-gray-950 justify-center p-3'>
        { isLoading ?
          <div className='flex flex-col w-full max-h-screen'>
            <div className='flex'>
              <div className='w-full flex justify-center bg-gray-950'>
                {photoUrl && <img className='rounded-2xl object-center w-4/5 mt-3' src={photoUrl} alt="Captured Frame" />}
              </div>
            </div>
            <div className='flex justify-center items-center mt-7'>
              <Spinner />
            </div>
          </div>
          :
          <>
            <div className='flex'>
              <div className='w-screen flex items-center justify-center bg-gray-950'>
                {photoUrl && <img className='rounded-t-2xl object-center w-4/5 mt-8' src={photoUrl} alt="Captured Frame" />}
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='w-full bg-transparent flex justify-center items-center'>
                <div className='w-4/5 bg-gray-600 rounded-b-2xl items-center'>
                  <p className='text-white font-semibold text-md text-center p-2'>{title}</p>
                </div>
              </div>
            </div>
            {information && <InfoBox info={information}/>}
          </>
        }
      </div>
    </>
  )
}

InformationPg.propTypes = {
  photo: PropTypes.string,
  apiKey: PropTypes.string,
  manualLocation: PropTypes.string,
}

export default InformationPg
