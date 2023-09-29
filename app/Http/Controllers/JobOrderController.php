<?php

namespace App\Http\Controllers;  // Only one namespace declaration is needed at the top

use App\Models\JobOrder;
use App\Models\JobDescription;
use App\Models\JobOrderMaterial;
use App\Models\Quotation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use PDF;

class JobOrderController extends Controller
{
    public function saveJobOrder(Request $request){
        $validatedData = $request->validate([
            'customername' => 'required|max:255',
            'unitcode' => 'required|max:255',
            'unitdescription' => 'required|max:255',
        ]);
    
        $jobOrder = new JobOrder();
    
        $jobOrder->user_id = Auth::id(); 
        $jobOrder->customername = $validatedData['customername'];
        $jobOrder->unitcode = $validatedData['unitcode'];
        $jobOrder->unitdescription = $validatedData['unitdescription'];

        $jobOrder->save();

        $descriptions = $request->input('descriptions'); 

        foreach ($descriptions as $desc) {
            $jobDescription = new JobDescription();
            $jobDescription->job_order_id = $jobOrder->id;
            $jobDescription->description = $desc;
            $jobDescription->save();
        }

        return redirect()->route('index');
    }

    public function approveJobOrder(Request $request){
        $joborderid = $request->input('joId');
        $joborder = JobOrder::find($joborderid);

        $status = "";
        if($request->input('action') === 'approve'){
            $status = "approved";
        }
        else{
            $status = "rejected";
        }

        $joborder->status = $status; // replace with your actual logic
        $joborder->approver_id = Auth::id(); // replace with your actual logic
        $joborder->approved_date = now(); // replace with your actual logic
        
        if($joborder->save()){
            if($status == "approved"){
                return redirect()->back()->with('success', 'Job Order Approved!');
            }
            else{
                return redirect()->back()->with('error', 'Job Order Rejected!');
            }
        }
        else{
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }

    public function quotationDecision(Request $request){
        $joborderid = $request->input('joIdquotation');
        $quotation = Quotation::where('job_order_id', $joborderid)->first();

        $status = "";
        if($request->input('quotationaction') === 'approve'){
            $status = "approved";
        }
        else{
            $status = "rejected";
        }

        $quotation->status = $status; // replace with your actual logic
        $quotation->approver_id = Auth::id(); // replace with your actual logic
        $quotation->approved_date = now(); // replace with your actual logic
        
        if($quotation->save()){
            if($status == "approved"){
                return redirect()->back()->with('success', 'Quotation Approved!');
            }
            else{
                return redirect()->back()->with('error', 'Quotation Rejected!');
            }
        }
        else{
            return redirect()->back()->with('error', 'Something went wrong!');
        }


    }

    public function quoteJobOrder(Request $request){
        $jobOrder = JobOrder::find($request->input('joId'));
        $jobOrder->billing = "quoted";
        $jobOrder->save();

        $descriptionIds = $request->input('jobdescriptionids');
        $descriptionAmounts = $request->input('descriptionamounts');

        foreach ($descriptionIds as $index => $descriptionId) {
            $jobDescription = JobDescription::find($descriptionIds[$index]);
            if ($jobDescription && isset($descriptionAmounts[$index])) {
                $jobDescription->amount = $descriptionAmounts[$index];
                $jobDescription->save();
            }
            
        }
        

        $materialids = $request->input('materialids'); 
        $materials = $request->input('materials'); 
        $materialsAmounts = $request->input('materialsamounts');
        if($materialids){
            foreach ($materials as $index => $material) {
                if (empty($materialids[$index])) {
                    $jobOrderMaterial = new JobOrderMaterial();
                    $jobOrderMaterial->job_order_id = $request->input('joId');
                    $jobOrderMaterial->material = $materials[$index];
                    $jobOrderMaterial->amount = $materialsAmounts[$index];
                    $jobOrderMaterial->save();
                }
                else{
                    $jobOrderMaterial = JobOrderMaterial::find($materialids[$index]);
                    $jobOrderMaterial->material = $materials[$index];
                    if( isset($materialsAmounts[$index])){
                        $jobOrderMaterial->amount = $materialsAmounts[$index];
                    }
                    $jobOrderMaterial->save();
                }
                    
            }
        }
        $rowsToDelete = [];
        if ($request->has('materialsToDelete')) {
            $rowsToDelete = $request->input('materialsToDelete');
            JobOrderMaterial::whereIn('id', $rowsToDelete)->update(['deleted' => 1]);
        }

        $quotation = Quotation::where('job_order_id', $request->input('joId'))->first();
        if(!$quotation){
            $quotation = new Quotation();
        }
        $vatChecked = $request->has('vatcheckbox');
        $quotation->job_order_id = $request->input('joId');
        $quotation->vat = $vatChecked ? 1 : 0;
        $quotation->user_id = Auth::id();
        if($quotation->save()){
            return redirect()->route('index')->with('success', 'Quotation Saved.');
        }
        else{
            return redirect()->route('index')->with('error', 'Something went wrong.');
        }
        
    }
    

    // public function generatequotation(){
    public function generatequotation($jobOrderId) {
        $jobOrder = JobOrder::find($jobOrderId);
        $data = [
            'title' => 'Welcome to HDTuto.com',
            'jobOrder' => $jobOrder,
            // ... add other data as needed
        ];

        $pdf = PDF::loadView('pdfs.quotation', $data);
        // dd($jobOrder->customername);

        
        return $pdf->download('hdtuto.pdf');
    }

}
