class CreateUserDecks < ActiveRecord::Migration[7.1]
  def change
    create_table :user_decks do |t|

      t.timestamps
    end
  end
end
