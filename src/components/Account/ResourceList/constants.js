export const typeConstants = {
  borrowed: {
    displayName: 'Checked Out',
    renewButton: true,
    exportButton: false,
    deleteButton: false,
    columns: {
      title: 'Title',
      author: 'Author',
      dueDate: 'Due Date',
      renewable: 'Renewable',
      from: 'From',
    },
    emptyText: 'You have no checked out items.',
    headerTextSuffix: 'Checked Out',
  },
  pending: {
    displayName: 'Pending',
    renewButton: false,
    exportButton: false,
    deleteButton: false,
    columns: {
      title: 'Title',
      author: 'Author',
      status: 'Status',
      from: 'From',
    },
    emptyText: 'You have no pending items.',
    headerTextSuffix: 'Pending',
  },
  history: {
    displayName: 'Checkout History',
    renewButton: false,
    exportButton: true,
    deleteButton: true,
    columns: {
      title: 'Title',
      author: 'Author',
      loanDate: 'Checked Out',
      dueDate: 'Due Date',
      returnDate: 'Returned',
      from: 'From',
    },
    emptyText: 'You have no items in your checkout history.',
    headerTextSuffix: 'in Checkout History',
  },
}

export default typeConstants
