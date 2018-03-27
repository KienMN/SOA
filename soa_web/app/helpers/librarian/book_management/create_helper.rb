module Librarian::BookManagement::CreateHelper
  def process
    create_book

    generate_status
  end

  def create_book
    @new_book = ::Book.create(create_book_params)
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @new_book
    }
  end

  private
  def create_book_params
    @params.permit(:title, :author, :country, :language,
      :pages, :publish_date, :quantity_in_stock)
  end
end
