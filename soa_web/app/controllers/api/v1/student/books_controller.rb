class Api::V1::Student::BooksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> {pre_processing}

  include Student::Book::BookHelper

  def index
    render json: @action.status
  end

  def show
    render json: @action.status
  end
end
