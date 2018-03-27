module Student::BookBorrow::CreateHelper
  def process
    create_book_borrow

    generate_status
  end

  def create_book_borrow
    ::BookBorrow.transaction do
      ::BookBorrow.create(create_book_borrow_params)
      @book = ::Book.find_by(id: @params[:book_id])

      @book.update_attributes(quantity_in_stock: @book.quantity_in_stock - 1)
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :date    => {
        :book => @book
      }
    }
  end

  private
  def create_book_borrow_params
    @params.permit(:user_id, :book_id)
  end
end
