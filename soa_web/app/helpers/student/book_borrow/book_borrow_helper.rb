module Student::BookBorrow::BookBorrowHelper
  def pre_processing
    case action_name
    when 'create'
      @action = Create.new(params: params)
    when 'index'
      @action = Index.new(params: params)
    when 'destroy'
      @action = Destroy.new(params: params)
    end

    implementation
  end

  def implementation
    @action.process
  end

  class Base
    attr_reader :status

    def initialize(options)
      @params = options[:params]
    end
  end

  class Create < Base
    include Student::BookBorrow::CreateHelper

    def initialize(options)
      super(options)
    end
  end

  class Index < Base
    include Student::BookBorrow::IndexHelper

    def initialize(options)
      super(options)
    end
  end

  class Destroy < Base
    include Student::BookBorrow::DestroyHelper

    def initialize(options)
      super(options)
    end
  end
end
