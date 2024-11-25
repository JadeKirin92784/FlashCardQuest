class CreateUserCardSets < ActiveRecord::Migration[7.1]
  def change
    create_table :user_card_sets do |t|
      t.references :cardset, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
