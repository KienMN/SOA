module Student::BookBorrow::IndexHelper
  def process
    get_borrowed_books

    generate_status
  end

  def get_borrowed_books
    @books = ::Book.joins(:book_borrows).where("book_borrows.user_id = ?", @params[:user_id])
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @books
    }
  end
end
