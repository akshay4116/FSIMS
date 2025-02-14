<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ✅ Clear Tables Before Seeding
        DB::table('users')->delete();
        DB::table('colleges')->delete();
        DB::table('students')->delete();

        // ✅ Insert Admin User
        DB::table('users')->insert([
            [
                'user_email' => 'a1@a1.com',
                'user_password' => Hash::make('a1'),
                'user_role' => 'admin',
                'college_code' => null, // Admin doesn't belong to any college
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);

        // ✅ Insert Colleges
        DB::table('colleges')->insert([
            [
                'college_name' => 'College A',
                'college_code' => 'COLL001',
                'college_email' => 'c1@c1.com',
                'college_address' => '123 Main St',
                'college_state' => 'NY',
                'college_city' => 'New York',
                'college_phone_number' => '1234567890',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'college_name' => 'College B',
                'college_code' => 'COLL002',
                'college_email' => 'c2@c2.com',
                'college_address' => '456 Elm St',
                'college_state' => 'CA',
                'college_city' => 'Los Angeles',
                'college_phone_number' => '0987654321',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);

        // ✅ Insert College Users
        DB::table('users')->insert([
            [
                'user_email' => 'c1@c1.com',
                'user_password' => Hash::make('c1'),
                'user_role' => 'college',
                'college_code' => 'COLL001',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_email' => 'c2@c2.com',
                'user_password' => Hash::make('c2'),
                'user_role' => 'college',
                'college_code' => 'COLL002',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);

        // ✅ Insert Student Users
        DB::table('users')->insert([
            [
                'user_email' => 's1@s1.com',
                'user_password' => Hash::make('s1'),
                'user_role' => 'student',
                'college_code' => 'COLL001',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_email' => 's2@s2.com',
                'user_password' => Hash::make('s2'),
                'user_role' => 'student',
                'college_code' => 'COLL002',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);

        // ✅ Insert Students (Linked to Users)
        DB::table('students')->insert([
            [
                'student_name' => 'Student One',
                'student_email' => 's1@s1.com',
                'student_phone_number' => '9876543210',
                'student_dob' => '2000-05-15',
                'student_father_name' => 'Father One',
                'student_address' => '789 Maple St',
                'student_city' => 'New York',
                'student_state' => 'NY',
                'student_country' => 'USA',
                'student_passport_number' => 'P123456',
                'student_visa_number' => 'VISA001',
                'student_visa_status' => 'Pending',
                'college_code' => 'COLL001',
                'college_comments' => 'Needs to provide additional documents.',
                'admin_comments' => 'Pending admin verification.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'student_name' => 'Student Two',
                'student_email' => 's2@s2.com',
                'student_phone_number' => '8765432109',
                'student_dob' => '1999-08-20',
                'student_father_name' => 'Father Two',
                'student_address' => '321 Oak St',
                'student_city' => 'Los Angeles',
                'student_state' => 'CA',
                'student_country' => 'USA',
                'student_passport_number' => 'P654321',
                'student_visa_number' => 'VISA002',
                'student_visa_status' => 'Approved',
                'college_code' => 'COLL002',
                'college_comments' => 'Visa approved, all documents verified.',
                'admin_comments' => 'Admin approved successfully.',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
