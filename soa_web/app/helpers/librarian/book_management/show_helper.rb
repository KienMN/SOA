module Librarian::BookManagement::ShowHelper
  def process
    get_book

    generate_status
  end

  def get_book
    @book = ::Book.find_by(id: @params[:id])
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @book,
    }
  end
end
