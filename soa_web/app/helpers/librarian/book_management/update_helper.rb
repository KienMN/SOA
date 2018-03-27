module Librarian::BookManagement::UpdateHelper
  def process
    update_book_info

    generate_status
  end

  def update_book_info
    @updated_book = ::Book.find_by(id: @params[:id])
    @updated_book.update_attributes(update_book_params)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @updated_book,
    }
  end

  private
  def update_book_params
    @params.permit(:title, :author, :country, :language,
      :pages, :publish_date, :quantity_in_stock)
  end
end
