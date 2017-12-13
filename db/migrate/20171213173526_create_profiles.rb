class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.belongs_to :user
      t.string :facebook
      t.string :instagram
      t.string :twitter
      t.string :google
      t.string :linkedin

      t.timestamps
    end
  end
end
