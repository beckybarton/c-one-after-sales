<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="{{ asset('js/quotation.js') }}"></script>
    <title>C-ONE Trading Corporation | After Sales | Quotation</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- <link href="{{ asset('css/custom.css') }}" rel="stylesheet"> -->
    <style>
        body {
            font-size: 0.9rem;
        }

        h2, h4 {
            font-size: 1.1rem;
        }

        hr {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        address {
            font-style: normal;
            line-height: 1.2;
        }

        .compact-table th, .compact-table td {
            padding: 2px 2px;  /* adjust values as needed */
            font-size: 12px;
        }

        .header-section {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
        }

        .company-logo {
            margin-right: 15px;
        }

        .company-details {
            text-align: center;
        }

        .company-name {
            font-size: 24px;
            font-weight: bold;
            font-family: Arial Black, sans-serif;
        }
        .company-address,
        .company-contacts {
            font-size: 10px;
        }

        .compact-table td, .compact-table th {
            padding: 0.1rem;  /* Reduced padding for compactness */
            vertical-align: middle;
        }
        .customer-data {
            font-size: 12px;
            /* border: 1px solid #c9c9c5; */
        }
        .customer-data .highlight, .compact-table .highlight {
            background-color: #c9c9c5;
            border: 1px solid black;
        }

        .table.outer-border {
            border-collapse: separate;
            border: 1px solid #dee2e6;  /* Border color from Bootstrap */
        }

        .table.outer-border th, 
        .table.outer-border td {
            border: none !important;  /* Remove inner borders */
        }

        .table.outer-border th:last-child, 
        .table.outer-border td:last-child {
            border-right: none !important;  /* Remove right border for the last cell */
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header-section">
            <!-- <img src="path_to_logo.jpg" alt="Company Logo" class="company-logo"> -->
            <div class="company-details">
                <div class="company-name">C-ONE Trading Corporation</div>
                <div class="company-address">Zone 1, Taytay, El Salvador City, 9017, Misamis Oriental</div>
                <div class="company-contacts">Phone: +63917 705 9132 | Email: inquiry@c-one.ph</div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12 text-left"><span style="color: gray; font-weight: bold;">Work Estimate</span></div>
        </div>
    </div>
    <br>
    <div class="container">
        <table class="table table-borderless compact-table customer-data">
            <tr>
                <td><strong>Name:</strong></td>
                <td>{{ucwords($jobOrder->customername)}}</td>
                <td><strong>Date:</strong></td>
                <td class="text-center highlight">{{ \Carbon\Carbon::parse($jobOrder->quotation->created_at)->format('M d, Y') }}</td>
            </tr>
            <tr>
                <td><strong>Address:</strong></td>
                <td>{{ucwords($jobOrder->customeraddress)}}</td>
                <td><strong>Valid Until:</strong></td>
                <td class="text-center highlight">{{ \Carbon\Carbon::parse($jobOrder->quotation->created_at)->addDays(15)->format('M d, Y') }}</td>
            </tr>
            <tr>
                <td><strong>Contact No:</strong></td>
                <td>{{ucwords($jobOrder->customercontact)}}</td>
                <td><strong>Reference #:</strong></td>
                <td class="text-center highlight">{{ 'ASQ2-' . $jobOrder->quotation->created_at->format('Y') . '-' . sprintf('%04d', $jobOrder->quotation->id) }}</td>
            </tr>

            <tr>
                <td colspan=2 class="highlight"><strong>Unit Description</strong></td>
                <td class="highlight"><strong>Serial/Engine No.</strong></td>
                <td class="highlight"><strong>Plate No.</strong></td>
            </tr>

            <tr>
                <td colspan=2>{{ucwords($jobOrder->unitdescription)}}</td>
                <td>{{strtoupper($jobOrder->engine)}}</td>
                <td>{{strtoupper($jobOrder->platenumber)}}</td>
            </tr>
        </table>

    </div>

    <div class="container mt-3">
        <div class="row mt-1">
            <div class="col-md-12">
                <table class="table outer-border compact-table">
                    <thead>
                        <tr>
                            <th class="highlight"><strong>#</strong></th>
                            <th class="highlight"><strong>Description</strong></th>
                            <th class="highlight text-right"><strong>Amount</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($jobOrder->jobDescriptions as $jobdescription)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td> {{ucfirst($jobdescription->description)}} </td>
                                <td class="text-right"> {{number_format($jobdescription->amount,2)}} </td>
                            </tr>
                        @endforeach
                        <tr>
                            <td colspan="2" class="text-right "><strong>Total:</strong></td>
                            <td class="text-right highlight"><strong>{{ number_format($jobOrder->totalAmount, 2) }}</strong></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="highlight"><strong>#</strong></th>
                            <td class="highlight"><strong>Material</strong></th>
                            <td class="text-right highlight"><strong>Amount</strong></th>
                        </tr>
                        @foreach($jobOrder->job_order_materials as $material)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td> {{ucfirst($material->material)}} </td>
                                <td class="text-right"> {{number_format($material->amount,2)}} </td>
                            </tr>
                        @endforeach
                        <tr>
                            <td colspan="2" class="text-right "><strong>Total:</strong></td>
                            <td class="text-right highlight"><strong>{{ number_format($jobOrder->totalAmountMaterials, 2) }}</strong></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table outer-border compact-table">
                    <tr>
                    <td rowspan="6" style="width:70%;">
                        <span><strong>Terms & Conditions</strong>:</span></br>
                        <span style="font-size:10px;">This estimate is for completing the job above. It is solely based on our evaluation based upon on our 
                            initial inspection and does not include <strong>Material price increase or additional labor or materials</strong> 
                            that may be needed, should unforeseen problems develop following the start of the job.<br>
                            <strong>Additional Fees</strong> shall be charged if further defective parts are found during repair, 
                            you shall be notified immediately.<br>
                            C-ONE Trucks and Equipment will charge <strong>Php100.00/day storage fee</strong> going back to the 
                            day the repairs are completed if unit  is not pulled out after notification.<br>
                            Parts amounting to <strong>P50,000.00 and above</strong> are subject for <strong>full payment (100%)</strong>.<br>
                            Estimated Date of Completion :  5 days or depends upon availability of materials.<br>
                            If you have questions concerning this please  contact <strong>MS. RELYN BASLOT</strong> through <strong>0917 711 3957</strong>.
                        </span>
                    </td>
                    <td colspan="" style="width:15%; font-size:10px;" class="text-left"><strong>Total Labor</strong></td>
                        <td class="text-right" style="width:15%; font-size:10px;" >
                            {{ number_format($jobOrder->totalAmount, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="" style="width:15%; font-size:10px;"  class="text-left"><strong>Total Materials</strong></td>
                        <td class="text-right" style="width:15%; font-size:10px;" >
                            {{ number_format($jobOrder->totalAmountMaterials, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="" style="width:15%; font-size:10px;"  class="text-left"><strong>Subtotal</strong></td>
                        <td class="text-right" style="width:15%; font-size:10px;" >
                            {{ number_format($jobOrder->totalAmount + $jobOrder->totalAmountMaterials, 2) }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="" style="width:15%; font-size:10px;"  class="text-left"><strong>{{ $jobOrder->quotation->vat == 1 ? 'VAT' : '' }}</strong></td>
                        <td class="text-right" style="width:15%; font-size:10px;" >
                            {{ $jobOrder->quotation->vat == 1 ? number_format(($jobOrder->totalAmount + $jobOrder->totalAmountMaterials)*0.12, 2) : '' }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="" style="width:15%;"  class="text-left highlight"><strong>Grand Total</strong></td>
                        <td class="text-right highlight" style="width:15%;" >
                            <strong>{{ $jobOrder->quotation->vat == 1 ? number_format(($jobOrder->totalAmount + $jobOrder->totalAmountMaterials)*1.12, 2) : number_format(($jobOrder->totalAmount + $jobOrder->totalAmountMaterials), 2) }}</strong>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <br>
        
        <table class="table table-borderless">
            <tr>
                <td>
                    <small>Prepared By:</small><br><br>
                    <strong><span style="font-size:11px;">{{ strtoupper($jobOrder->user->first_name) }} {{ strtoupper($jobOrder->user->last_name) }}</span></strong> <br>
                    <small class="text-muted"><span style="font-size:10px;">{{ ucwords($jobOrder->user->position) }}</span></small> 
                </td>
                <td>
                    <small>Approved By:</small><br><br>
                    <strong><span style="font-size:11px;">{{ strtoupper($jobOrder->quotation->approver->first_name) }} {{ strtoupper($jobOrder->quotation->approver->last_name) }}</span></strong><br>
                    <small class="text-muted"><span style="font-size:10px;">{{ ucwords($jobOrder->quotation->approver->position) }}</span></small> 
                </td>
                <td>    
                    <small>Noted By:</small><br><br>
                    <strong><span style="font-size:11px;">MARCELA CORTEZ</span></strong>
                </td>
            </tr>
            <tr>
                <td colspan="3" class="text-center text-muted"><span><small>Note: This is approved in the system. No signature is required.</small></span></td>
            </tr>
        </table>

        <hr>

        <div class="row mt-1">
            <div class="col-md-12 text-center">
                <p><i><strong>THANK YOU FOR MAKING BUSINESS WITH US!</strong></i></p>
                <p style="font-size:10px">C-ONE TRADING CORPORATION, Zone 1, El Salvador, Taytay, 9017, Misamis Oriental, Philippines</p>
                <p style="font-size:10px">Phone: +63917 705 9132 | Email: inquiry@c-one.ph</p>
            </div>
        </div>
    </div>

</body>

</html>
