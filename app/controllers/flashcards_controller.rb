class FlashcardsController < ApplicationController
  def new
    @flashcard = Flashcard.new
  end

  def create
    @flashcard = Flashcard.new(flashcard_params)

    if @flashcard.save 
      redirect_to flashcard_path(@flashcard)
    else
      raise #shouldn't get here
    end
  end 

  def show
    @flashcard = Flashcard.find(params[:id])
  end

  def flashcard_params
    params.require(:flashcard).permit(:question, :answer)
  end
end
