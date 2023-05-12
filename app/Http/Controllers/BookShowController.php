<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Books;
use Illuminate\Support\Facades\DB;

class BookShowController extends Controller
{
    public function index(Request $request)
    {
        $parameter = $request->parameter;
        $value = $request->value; 

        $query = DB::table('books')->select('*');

        $data = $parameter ? $query->where($parameter, 'LIKE', '%'.$value.'%')->paginate(10) : $query->paginate(10);
        return response()->json([
            'status' => 200,
            'message' => "book list success.",
            'data' => $data,
        ], 200);
    }

    public function show($id = false)
    {
        $query = DB::table('books')->select('*');

        $data = $id ? $query->where('id', '=', $id)->get() : $query->get();
        return response()->json([
            'status' => 200,
            'message' => "book list success.",
            'data' => $data,
        ], 200);
    }
}
