<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller
{
    public function index(){
        return view('user.register');
    }

    public function registerSave(Request $request){
        // Validate the form data
        $validatedData = $request->validate([
            'last_name' => 'required|max:255',
            'first_name' => 'required|max:255',
            'position' => 'required|max:255',
            'role' => 'required|max:255',
            'mobile_number' => 'required',
            'email' => 'required|email|unique:users',
        ]);

        $password = strtolower($validatedData['first_name'] . $validatedData['last_name']);
        $password = str_replace(' ', '', $password);

        $user = new User();
        $user->first_name = $validatedData['first_name'];
        $user->last_name = $validatedData['last_name'];
        $user->email = $validatedData['email'];
        $user->mobile_number = $validatedData['mobile_number'];
        $user->position = $validatedData['position'];
        $user->role = $validatedData['role'];
        $user->password = Hash::make($password);
        $user->save();
        return redirect()->route('login');
    }
}
