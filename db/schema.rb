# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160715145824) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notes", force: :cascade do |t|
    t.string   "name",       limit: 40
    t.string   "note",       limit: 50
    t.string   "qualifier",  limit: 40
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "notes", ["name"], name: "index_notes_on_name", using: :btree

  create_table "numbers", force: :cascade do |t|
    t.string   "name",        limit: 40
    t.string   "character",   limit: 50
    t.string   "unicode",     limit: 50
    t.string   "glyphicon",   limit: 50
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.text     "description"
  end

  add_index "numbers", ["name"], name: "index_numbers_on_name", using: :btree

  create_table "scales", force: :cascade do |t|
    t.string   "name",       limit: 40
    t.string   "formula",    limit: 50
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "scales", ["name"], name: "index_scales_on_name", using: :btree

  create_table "stats", force: :cascade do |t|
    t.integer  "time",       limit: 8
    t.integer  "frequency"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "number_id"
    t.integer  "note_id"
    t.integer  "scale_id"
  end

  add_index "stats", ["note_id"], name: "index_stats_on_note_id", using: :btree
  add_index "stats", ["number_id"], name: "index_stats_on_number_id", using: :btree
  add_index "stats", ["scale_id"], name: "index_stats_on_scale_id", using: :btree

  add_foreign_key "stats", "notes"
  add_foreign_key "stats", "numbers"
  add_foreign_key "stats", "scales"
end
