// place files you want to import through the `$lib` alias in this folder.
const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

const filtersList = [
  {name: 'Style', value: 'style'},
  {name: 'Difficulty', value: 'difficulty'},
  {name: 'With Capo', value: 'with_capo'},
  {name: 'Priority', value: 'priority'},
]

const prioritiesList = [
  'Low',
  'Mediun',
  'High'
]

const difficultiesList = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
]

const stylesList = [
  'Acoustic',
  'Electric',
  'Classical',
  'Fingerstyle',
  'Blues',
  'Jazz',
  'Rock',
  'Metal',
  'Folk',
  'Country',
  'Flamenco',
  'Reggae',
  'Pop',
  'Funk',
  'R&B',
  'Alternative',
  'Indie',
  'Punk',
  'Gospal',
  'Experimenta'
]

export {
  prioritiesList, difficultiesList, stylesList, isValidUrl, filtersList
}