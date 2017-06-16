import RoomImage from '../../../static/images/reserveroom.jpg'
import ScanImage from '../../../static/images/scan.jpg'

export const servicesData = [
  {
    title: 'Featured Services',
    classes: 'col-md-offset-2 col-md-2',
    items: [
      {
        title: 'Reserve a Room',
        url: '/room-reservations',
        image: RoomImage,
      },
      {
        title: 'Copy, Print, Scan',
        url: '/copy-print-scan',
        image: ScanImage,
      },
    ],
  },
  {
    title: 'Borrow',
    classes: 'col-md-3',
    items: [
      {
        title: 'Borrow, Renew, Request Policies',
        url: '/borrow-renew-request',
      },
      {
        title: 'Interlibrary Loan & Document Delivery',
        url: 'https://nd.illiad.oclc.org/illiad/IND/illiad.dll',
      },
      {
        title: 'Course Reserves',
        url: 'https://reserves.library.nd.edu/courses',
      },
      {
        title: 'Technology Lending Policies',
        url: '/technology-lending',
      },

    ],
  },
  {
    title: 'Teaching and Consulting',
    classes: 'col-md-3',
    items: [
      {
        title: 'Request Library Research Instruction',
        url: '/request-library-research-instruction',
      },
      {
        title: 'Workshops',
        url: '/workshops',
      },
      {
        title: 'Thesis and Dissertation Camps',
        url: '/thesis-dissertation-camps',
      },
      {
        title: 'Consultations (Meet with a Librarian)',
        url: '/consultation-teaching',
      },
    ],
  },
]
