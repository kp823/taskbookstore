<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('total_pages');
            $table->integer('rating');
            $table->string('title')->nullable();
            $table->string('author')->nullable();
            $table->string('genre')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();//will contain url to image
            $table->string('isbn')->nullable();
            $table->date('published')->nullable();
            $table->string('publisher')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('books');
    }
}
