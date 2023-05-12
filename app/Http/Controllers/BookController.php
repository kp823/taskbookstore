<?php

namespace App\Http\Controllers;

use App\Books;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Displays All Data and Also Data Details from Database.
     *
     * @return JSON
     */
    public function index($id = false)
    {
        $query = DB::table('books')->select('*');
        $data = $id ? $query->where('id', '=', $id)->paginate(10) : $query->paginate(10);
        return response()->json([
            'status' => 200,
            'message' => "Successfully Viewing Database.",
            'data' => $data,
        ], 200);
    }

    /**
     * Saving and Also Updating Records Into Database.
     *
     * @param  $id
     * @return JSON
     */
    public function store($id = false)
    {
        $data = request()->validate([
            'title' => 'required|string',
            'author' => 'required',
            'genre' => 'required',
            'description' => 'required|max:500',
            'isbn' => 'required|string',
            'published' => 'required|date',
            'publisher' => 'required',
            'image' => 'required'
        ]);

        if ($id) {
            $book = Books::find($id);
            if ($book) {
                $book->update($data);

                return response()->json([
                    'status' => $id ? 200 : 201,
                    'message' => "Successfully changed data",
                    'data' => $data
                ]);
            }

            return response()->json([
                'status' => 404,
                'message' => "Data not found"
            ]);
        } else {
            $book = Books::create($data);
        }

        return response()->json([
            'status' => $id ? 200 : 201,
            'message' => "Successfully added data",
            'data' => $data
        ]);
    }

    /**
     * Deleting Records From Database.
     *
     * @param  $id
     * @return JSON
     */
    public function destroy($id)
    {
        $find = Books::find($id);
        if ($find) {
            $find->delete();
        } else {
            return response()->json([
                'status' => 404,
                'message' => "Data not found.",
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => "Successfully deleted data",
        ]);
    }
}
