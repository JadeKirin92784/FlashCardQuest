class DecksController < ApplicationController
  def index
    @decks = current_user.decks
  end

  def new
    @deck = Deck.new
  end

  def create
    @deck = Deck.new(deck_params)

    if @deck.save 
      redirect_to deck_path(@deck)
    else
      raise #shouldn't get here
    end
  end 

  def show
    @deck = Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:topic)
  end
  
end
