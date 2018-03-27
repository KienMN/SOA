namespace :test_request do
  task get_student_books: :environment do
    require 'net/http'
    require 'uri'

    uri = URI.parse("http://localhost:3000/api/v1/student/books?page=4")
    response = Net::HTTP.get_response(uri)
    puts response.body
  end

  task create_borrow_book: :environment do
    require 'net/http'
    require 'uri'
    require 'json'


    uri = URI.parse("http://localhost:3000/api/v1/student/book_borrows")
    res = Net::HTTP.post_form(uri, 'user_id' => 2, 'book_id' => Book.first.id)
    puts res.body
  end
end
