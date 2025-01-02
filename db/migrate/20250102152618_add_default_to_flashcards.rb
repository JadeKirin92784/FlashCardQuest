class AddDefaultToFlashcards < ActiveRecord::Migration[7.1]
  def change
    change_column_default :flashcards, :question, from: nil, to: "default question"
    change_column_default :flashcards, :answer, from: nil, to: "default answer"
  end
end
