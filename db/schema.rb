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

ActiveRecord::Schema.define(version: 20140115174604) do

  create_table "collabs", force: true do |t|
    t.integer  "project_id"
    t.integer  "collaborator_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
  end

  add_index "collabs", ["collaborator_id"], name: "index_collabs_on_collaborator_id"
  add_index "collabs", ["project_id", "collaborator_id"], name: "index_collabs_on_project_id_and_collaborator_id", unique: true
  add_index "collabs", ["project_id"], name: "index_collabs_on_project_id"

  create_table "notes", force: true do |t|
    t.text     "content"
    t.integer  "project_id"
    t.integer  "collaborator_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "notes", ["collaborator_id", "created_at"], name: "index_notes_on_collaborator_id_and_created_at"
  add_index "notes", ["project_id", "created_at"], name: "index_notes_on_project_id_and_created_at"

  create_table "projects", force: true do |t|
    t.integer  "author_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "projects", ["author_id", "created_at"], name: "index_projects_on_author_id_and_created_at"

  create_table "regions", force: true do |t|
    t.integer  "track_id",   null: false
    t.float    "start_time", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "regions", ["track_id"], name: "index_regions_on_track_id"

  create_table "tracks", force: true do |t|
    t.string   "track_name"
    t.integer  "project_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "remember_token"
    t.boolean  "admin",           default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["remember_token"], name: "index_users_on_remember_token"

  create_table "versions", force: true do |t|
    t.integer  "project_id"
    t.integer  "collaborator_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "versions", ["collaborator_id", "created_at"], name: "index_versions_on_collaborator_id_and_created_at"
  add_index "versions", ["project_id", "created_at"], name: "index_versions_on_project_id_and_created_at"

end
