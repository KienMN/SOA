class Api::V1::Librarian::BookManagementsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action -> {pre_processing}

  include Librarian::BookManagement::BookManagementHelper

  def create
    render json: @action.status
  end

  def index
    render json: @action.status
  end

  def show
    render json: @action.status
  end

  def update
    render json: @action.status
  end

  def destroy
    render json: @action.status
  end
end
