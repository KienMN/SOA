import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Modal, Button} from 'react-bootstrap'

const serverLink = "http://127.0.0.1:3000";

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,								// Contaning error when fetching data
			searchKeyword: "",					// Keyword to filter title of book
			books: [],									// Contaning books of a selected page
			detailBook: {"id": 0},			// Detail information of selected book
			detailModalShow: false,			// Showing or hiding detail modal
			notificationModalShow: false,	// Showing or hiding notification modal 
			notificationMessage: "",		// Notification message
			sizePerPage: 0,							// Number of books per page
			totalEntries: 0,						// Total books in the database
			currentPage: 1							// Selected page
		}
		// Handling change page of book list
		this.onPageChange = this.onPageChange.bind(this);
		// Handling click on row (or book)
		this.onRowClick = this.onRowClick.bind(this);
		// Handling close the modal of detail information of selected book
		this.handleDetailClose = this.handleDetailClose.bind(this);
		// Handling close the modal of notification
		this.handleNotificationClose = this.handleNotificationClose.bind(this);
		// Handling action of borrowing book
		this.handleBorrowing = this.handleBorrowing.bind(this);
	}

	// Loading data per page when changing page
	onPageChange(page, sizePerPage) {
		// Sending request to server
		fetch(serverLink + '/api/v1/student/books?page=' + page + '&keyword=' + this.state.searchKeyword)
			.then(res => res.json())
			.then(
				// Fetching data and set values to components
				(result) => {
					this.setState({
						books: result.data.books,
						sizePerPage: result.data.per_page,
						totalEntries: result.data.total_entries,
						currentPage: page
					})
				},
				// Handling error while fetching data
				(error) => {
					this.setState({
						error
					})
				}
			)
	}

	// Showing detail of clicked row (or book)
	onRowClick(row) {
		if (this.state.detailBook.id !== row.id) {
			// Sending request to server
			fetch(serverLink + '/api/v1/student/books/' + row.id)
				.then(res => res.json())
				.then(
					// Fetching data and set values to components
					(result) => {
						this.setState({
							detailBook: result.data,
						})
					},
					// Handling error while fetch data
					(error) => {
						this.setState({
							error
						})
					}
	      )	
		}
		// Showing up modal of detail information of selected book
		this.setState({detailModalShow: true})
	}

	// Closing the modal of detail information of a book
	handleDetailClose() {
		this.setState({
			detailModalShow: false
		})
	}

	// Closing the modal of notification
	handleNotificationClose() {
		this.setState({
			notificationModalShow: false
		})
	}

	// Handling the request of borrowing book
	handleBorrowing() {
		// Sending request to server
		fetch(serverLink + '/api/v1/student/book_borrows', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"user_id": 2,													// corresponding to the student
				"book_id": this.state.detailBook.id		// corresponding to the selected book
			})
		})
			.then(res => res.json())
			.then(
				// Fetching data and set values to components
				(result) => {
					console.log(result);
					if (result.code === 1) {
						this.setState({
							detailBook: result.date.book,
							notificationMessage: "Mượn sách thành công."
						})
					} else {
						this.setState({
							notificationMessage: "Mượn sách không thành công. Vui lòng thử lại sau."
						})
					}
					this.setState({
						notificationModalShow: true,
						detailModalShow: false
					})
				},
				// Handling error while fetching data
				(error) => {
					this.setState({
						error
					})
				}
      )
	}

	// Loading data before first rendering
	componentDidMount() {
		// Sending request to server
		fetch(serverLink + '/api/v1/student/books?page=' + this.state.currentPage + '&keyword=' + this.state.searchKeyword)
			.then(res => res.json())
			.then(
				// Fetching data and set values to components
				(result) => {
					this.setState({
						books: result.data.books,
						sizePerPage: result.data.per_page,
						totalEntries: result.data.total_entries,
					})
				},
				// Handling error while fetching data
				(error) => {
					this.setState({
						error
					})
				}
      )
	}

	// Handling search keyword change
	componentWillReceiveProps(nextProps) {
		// Sending request to server when keyword changes
		fetch(serverLink + '/api/v1/student/books?page=1&keyword=' + nextProps.searchKeyword)
			.then(res => res.json())
			.then(
				// Fetching data and set values to components
				(result) => {
					console.log(result);
					this.setState({
						page: 1,
						searchKeyword: nextProps.searchKeyword,
						books: result.data.books,
						sizePerPage: result.data.per_page,
						totalEntries: result.data.total_entries,
					})
				},
				// Handling error while fetching data
				(error) => {
					this.setState({
						error
					})
				}
      )
	}

	// Rendering list of books
	render() {
		// Options for the data table below
		const options = {
			onRowClick: this.onRowClick,
			sizePerPage: this.state.sizePerPage,
			totalPages: this.state.totalPage,
			sizePerPageList: [],
			onPageChange: this.onPageChange
		};
		// Showing up error while fetching data if it occurs
		if (this.state.error) {
			return <div>Error: {this.state.error.message}</div>
		}
		else {
			return(
				<div className="bookList">
					{/* Book list */}
					<BootstrapTable data={this.state.books} striped hover remote={true} pagination fetchInfo={ { dataTotalSize: this.state.totalEntries } } options={options}>
	      		<TableHeaderColumn isKey dataField='id' hidden={true}>ID</TableHeaderColumn>
						<TableHeaderColumn dataField='title'>Tiêu đề</TableHeaderColumn>
						<TableHeaderColumn dataField='author'>Tác giả</TableHeaderColumn>
						<TableHeaderColumn dataField='language'>Ngôn ngữ</TableHeaderColumn>
					</BootstrapTable>

  				{/* Detail information of a book */}
  				<Modal show={this.state.detailModalShow} onHide={this.handleDetailClose}>
  					<Modal.Header closeButton>
  						<Modal.Title>Thông tin sách</Modal.Title>
  					</Modal.Header>
  					<Modal.Body>
  						<p>Tên sách: {this.state.detailBook.title}</p>
  						<p>Tác giả: {this.state.detailBook.author}</p>
  						<p>Ngôn ngữ: {this.state.detailBook.language}</p>
  						<p>Đất nước: {this.state.detailBook.country}</p>
  						<p>Năm xuất bản: {(new Date(this.state.detailBook.publish_date)).getFullYear()}</p>
  						<p>Số trang: {this.state.detailBook.pages}</p>
  						<p>Số lượng hiện có: {this.state.detailBook.quantity_in_stock}</p>
  					</Modal.Body>
  					<Modal.Footer>
  						{(this.state.detailBook.quantity_in_stock < 2)? <Button bsStyle="primary" disabled>Mượn sách</Button>: 
							<Button onClick={this.handleBorrowing} bsStyle="primary">Mượn sách</Button>}
  						<Button onClick={this.handleDetailClose}>Đóng</Button>
  					</Modal.Footer>
  				</Modal>

  				{/* Notification */}
  				<Modal show={this.state.notificationModalShow} onHide={this.handleNotificationClose}>
  					<Modal.Header closeButton>
  						<Modal.Title>Thông báo</Modal.Title>
  					</Modal.Header>
  					<Modal.Body>
  						{this.state.notificationMessage}
  					</Modal.Body>
  					<Modal.Footer>
  						<Button onClick={this.handleNotificationClose} bsStyle="primary">Xác nhận</Button>
  					</Modal.Footer>
  				</Modal>
				</div>
			);
		}
	}
}

export default BookList;