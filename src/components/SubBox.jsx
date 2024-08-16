import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const SubBox = ({subtitle, text}) => {
  const [expanded, setExpanded] = useState(false);
  const [shortDescription, setShortDescription] = useState(text);
  const longDescription = text;
  const [description, setDescription] = useState(text)

  const switchLen = () => {
    const isExpanded = expanded;
    if (isExpanded){
      setDescription(shortDescription)
    } else if (!isExpanded){
      setDescription(longDescription)
    }
    setExpanded(!isExpanded)
  }

  useEffect(() => {
    const contract = () => {
      let idx = 0;
      let descriptionTemp = text;
      for (let i = 0; i<15; i++){
        idx = idx + descriptionTemp.indexOf(' ') + 1;
        descriptionTemp = descriptionTemp.slice(descriptionTemp.indexOf(' ') + 1);
      }
      let truncatedText = text.slice(0, idx-1)
      if ('!,.?;'.indexOf(truncatedText.charAt(truncatedText.length-1)) != -1){
        truncatedText = truncatedText.slice(0, truncatedText.length-1);
      };
      return (truncatedText.concat('...'))
    }
    const contractedText = contract(text)
    setShortDescription(contractedText)
    setDescription(contractedText)
  }, [text])

  return (
    <div className='w-4/5 flex flex-col justify-center bg-white mt-3 p-3 rounded-2xl'>
       <p className='text-indigo-900 font-semibold text-center'>{subtitle}</p>
       <p className='pt-2 pb-3 px-3'>{description}</p>
       <button onClick={switchLen} className='text-sm text-gray-600 focus:text-gray-700'>
        {expanded ? 'Show less' : 'Show more'}
       </button>
    </div>
  )
}
SubBox.propTypes = {
    subtitle: PropTypes.string,
    text: PropTypes.string,
}

export default SubBox
