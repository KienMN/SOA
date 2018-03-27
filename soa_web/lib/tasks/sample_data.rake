namespace :sample_data do
  desc "Task description"
  task generate: :environment do
    puts "Create User"
    Librarian.create(username: "librarian")
    Student.create(username: "student")

    puts "Create Books"
    book_data = JSON.parse(File.read("#{Rails.root.to_s}/lib/tasks/books.json"))
    book_data.each do |book|
      Book.bulk_insert do |worker|
        worker.add(
          :author       => book['author'],
          :country      => book['country'],
          :language     => book['language'],
          :pages        => book['pages'].to_s,
          :title        => book['title'],
          :publish_date => Time.new(book['year']),
          :quantity_in_stock => book['quantity']
        )
      end
    end

    puts "Create Book Borrow"
  end
end
