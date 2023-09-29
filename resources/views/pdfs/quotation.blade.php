<!-- <!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
</head>
<body>

<h1>{{ $title }}</h1>
<p>Welcome to generating a PDF with Laravel and Dompdf</p>
{{ $jobOrder->customername }}
</body>
</html> -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quotation Format</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        . {
            color: #006400; /* Dark Green color */
        }

        .green-border {
            border-color: #006400;
        }

        .bg-light-green {
            background-color: #e8f5e9; /* Light Green color */
        }

        hr.green-hr {
            border-top: 1px solid #006400;
        }
    </style>
</head>

<body>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h2 class="">C-ONE Trading Corporation</h2>
                <address class="">
                    Zone 1, Kauswagan<br>
                    Cagayan de Oro City, Misamis Oriental, 9000<br>
                    Phone: 088 858 2663<br>
                    Email: inquiry@c-one.ph
                </address>
            </div>
            <div class="col-md-6 text-right">
                <h2 class="">QUOTATION</h2>
                <p class="">Date: [Insert Date]</p>
                <p class="">Quotation #: [Insert Number]</p>
            </div>
        </div>

        <hr class="green-hr">

        <div class="row mt-4 bg-light-green">
            <div class="col-md-6">
                <h4 class="">Bill To:</h4>
                <address class="">
                    Customer Name<br>
                    Customer Address<br>
                    City, ZIP Code<br>
                    Phone: Customer Phone
                </address>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <table class="table table-bordered green-border">
                    <thead class="">
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="">
                            <td>Item 1</td>
                            <td>Description for item 1</td>
                            <td>1</td>
                            <td>$10.00</td>
                            <td>$10.00</td>
                        </tr>
                        <!-- Add more rows as necessary -->
                    </tbody>
                    <tfoot class="">
                        <tr>
                            <td colspan="4" class="text-right">Subtotal</td>
                            <td>$10.00</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-right">Tax (10%)</td>
                            <td>$1.00</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-right"><strong>Total</strong></td>
                            <td><strong>$11.00</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <p class="">Terms & Conditions: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus.</p>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-md-12 text-center">
                <p class="">Thank you for your business!</p>
            </div>
        </div>
    </div>

</body>

</html>
