import DatabaseImage from '../../../static/images/databases.jpg'
import SubjectImage from '../../../static/images/subjects.jpg'

export const researchData = [
  {
    title: 'Research By Subject',
    classes: 'col-md-offset-2 col-md-2',
    items: [
      {
        title: 'Browse A-Z Databases',
        url: '/databases/a',
        image: DatabaseImage,
      },
      {
        title: 'Browse A-Z Subjects',
        url: '/database-subject',
        image: SubjectImage,
      },
    ],
  },
  {
    title: 'Research Support',
    classes: 'col-md-3',
    items: [
      {
        title: 'Subject Librarians',
        url: '/subject-librarians',
      },
      {
        title: 'Copyright',
        url: '/copyright',
      },
      {
        title: 'Data Management',
        url: 'http://libguides.library.nd.edu/datamanagement',
      },
      {
        title: 'Research Guides',
        url: 'http://libguides.library.nd.edu',
      },
    ],
  },
  {
    title: 'Unique Collections',
    classes: 'col-md-3',
    items: [
      {
        title: 'Medieval Institute Library',
        url: '/medieval-institute-library',
      },
      {
        title: 'Rare Books and Special Collections',
        url: 'http://rarebooks.library.nd.edu/',
      },
      {
        title: 'Digital Exhibits and Collections',
        url: 'http://collections.library.nd.edu',
      },
      {
        title: 'CurateND',
        url: 'http://curate.nd.edu',
      },
      {
        title: 'Archives Collections',
        url: 'http://archives.nd.edu/findaids/ead/xml/',
      },
      {
        title: 'Exhibits',
        url: '/exhibits',
      },
    ],
  },
]
