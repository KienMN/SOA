class BookBorrow < ApplicationRecord
  belongs_to :book
  belongs_to :student

  before_create :checking_book_quantity

  private
  def checking_book_quantity
    book = Book.find_by(id: self.book_id)
    if book.quantity_in_stock <= 2
      raise Exception.new("Không được mượn khi số sách nhỏ hơn 2")
    end
  end
end
