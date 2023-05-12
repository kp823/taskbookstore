<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
Use App\Books;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $json = file_get_contents('https://fakerapi.it/api/v1/books?_quantity=100');
        $emplois = json_decode($json);
        
        $data1 = [];

        foreach ($emplois->data as $item) {
            $data1[] = array(
                'title' => $item->title ,
                'author' => $item->author ,
                'genre' => $item->genre ,
                'description' => $item->description ,
                'image' => $item->image ,
                'isbn' => $item->isbn ,
                'published' => $item->published ,
                'publisher' => $item->publisher ,
                'created_at' => now() ,
                'total_pages' => 0,
                'rating' => 0,
            );
        }        
        
        Books::insert($data1);
    }
}
