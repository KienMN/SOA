module Librarian::BookManagement::DestroyHelper
  def process
    destroy_book

    generate_status
  end

  def destroy_book
    ::Book.find_by(id: @params.id).destroy
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công"
    }
  end
end
