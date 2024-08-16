import PropTypes from 'prop-types'
import SubBox from './SubBox'

const InfoBox = ({info=''}) => {

  const information = info

  const extract = (information) => {
    let textList = []
    for (let i = 0; i < 5; i++){
      textList.push(information.slice(information.indexOf(`${i+1}. **`), information.indexOf(`${i+2}. **`)));
    }
    textList.push(information.slice(information.indexOf('6. **')))

    let subtitles = []
    for (let i = 0; i < 6; i++){
      subtitles.push(textList[i].slice(textList[i].indexOf("*")+2, textList[i].indexOf("**:")))
    }
    for (let i = 0; i < textList.length; i++){
      textList[i] = textList[i].slice(textList[i].indexOf("**:")+3)
    }
    return [textList, subtitles]
  }
  const [textList, subtitles] = extract(information) 
  return (
    <div className='bg-indigo-950 text-center'>
      {textList.map((item, index) => (
        <div key={index}>
          <SubBox subtitle = {subtitles[index]} text = {item}/>
        </div>
      ))}
    </div>
  )
}

InfoBox.propTypes = {
    info: PropTypes.string,
}
export default InfoBox
