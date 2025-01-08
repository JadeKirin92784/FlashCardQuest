class DecksController < ApplicationController
  def index
    @all_decks = Deck.all
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

  def edit
    @deck = Deck.find(params[:id])
    @flashcards = Flashcard.all
  end

  def update
    @deck = Deck.find(params[:id])
    if @deck.update(deck_params)
      flash[:success] = "Deck updated successfully"
      redirect_to @deck
    else
      flash[:error] = "There was a problem updating the deck."
      render :edit
    end
  end  

  def show
    @deck = Deck.find(params[:id])
  end

  def deck_params
    params.require(:deck).permit(:topic, flashcards_ids: [])
  end
  
end
