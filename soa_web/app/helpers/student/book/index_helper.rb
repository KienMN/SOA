module Student::Book::IndexHelper
  def process
    get_book_list

    generate_status
  end

  def get_book_list
    @books = Book.all.paginate(page: @params[:page], per_page: Settings.per_page)
  end

  def generate_status
    @status = {
      :code => Settings.code.success,
      :message => "",
      :data    => {
        :page     => @params[:page],
        :per_page => Settings.per_page,
        :books    => @books
      },
    }
  end
end