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
      flash[:error] = "There was a problem making the deck."
      render :new
    end
  end 

  def edit
    @deck = Deck.find(params[:id])
    @available_flashcards = Flashcard.where.not(id: @deck.flashcards.pluck(:id))  # Get flashcards not in the deck
  end

  def update
    raise
    @deck = Deck.find(params[:id])

    # Adding selected flashcards to the deck
    if params[:deck][:flashcard_ids_to_add].present?
      flashcards_ids_to_add = params[:deck][:flashcard_ids].reject(&:empty?)
      new_flashcards = Flashcard.where(id: flashcards_ids_to_add)
      new_flashcards.each do |card|
        @deck.flashcards << card unless @deck.flashcards.include?(card)
      end
    end

    if @deck.save
      flash[:success] = "Flashcards added to the deck."
      redirect_to @deck
    else
      flash[:error] = "There was a problem adding flashcards."
      render :edit
    end
  end

  def add_flashcards
    @deck = Deck.find(params[:id]) # Find the deck by ID

    # Extract selected flashcard IDs
    flashcard_ids = params[:deck][:flashcard_ids].reject(&:blank?)

    # Find the flashcards corresponding to the selected IDs
    flashcards_to_add = Flashcard.where(id: flashcard_ids)

    # Add flashcards to the deck, avoiding duplicates
    flashcards_to_add.each do |flashcard|
      @deck.flashcards << flashcard unless @deck.flashcards.include?(flashcard)
    end

    # Save the deck and provide feedback
    if @deck.save
      redirect_to @deck, notice: 'Flashcards were successfully added.'
    else
      flash.now[:alert] = 'Unable to add flashcards.'
      render :edit
    end
  end

  def show
    @deck = Deck.find(params[:id])
    @flashcards = @deck.flashcards
    @total_flashcards = @flashcards.count
  end

  def quiz
    @deck = Deck.find(params[:id])
    @flashcards = @deck.flashcards
    # Add any additional logic you need for the quiz view
  end

  def remove_flashcard
    @deck = Deck.find(params[:id])          # Find the deck by its ID
    @flashcard = Flashcard.find(params[:flashcard_id])  # Find the flashcard by its ID

    @deck.flashcards.delete(@flashcard)     # Remove the flashcard from the deck

    redirect_to edit_deck_path(@deck), notice: 'Card removed from the deck.'  # Redirect back to the edit page with a notice
  end

  private 

  def deck_params
    params.require(:deck).permit(:topic, flashcard_ids: [])
  end
end
