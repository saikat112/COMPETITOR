
    jQuery(document).ready(function($) {

        jQuery("#navbar_top").scrollToFixed();

        $(window).scroll(function () {
            if ($(window).scrollTop() <= 40) {
                //alert();
                $(".menumain").removeClass("scroll_navbar");
            }
            else {
                $(".menumain").addClass("scroll_navbar");
            }
        });

    });


     //INPUT VALIDATION
     document.getElementById('fname').setCustomValidity('Please enter your full name');
     document.getElementById('fcontact').setCustomValidity('Please enter a valid 10-digit mobile number');
     document.getElementById('femail').setCustomValidity('Please enter your email');

     function clearValidityMessage(element) {
         element.setCustomValidity('');
         const value = element.value.toString();
         if (value !== '' && value !== '-' && value !== '+' && value !== 'e' && value !== '-e' && value !== '+e') {
             element.classList.add('has-value');
         } else {
             element.classList.remove('has-value');
         }
     }
     document.getElementById('fcontact').addEventListener('input', function () {
         let phoneValue = this.value;
         let regex = /^\d{10}$/;
         if (!regex.test(phoneValue)) {
             this.setCustomValidity('Please enter a valid 10-digit mobile number');
         } else {
             this.setCustomValidity('');
         }
     });


     function validateEmail(element) {
       const emailValue = element.value;
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

       // Clear any previous validation messages
       element.setCustomValidity('');

       if (emailValue === '') {
           element.setCustomValidity('Email address is required');
       } else if (!emailRegex.test(emailValue)) {
           element.setCustomValidity('Please enter a valid email address');
       } else {
           element.setCustomValidity('');
       }
     }

     // Automatically validate email on blur to improve user experience
     document.getElementById('femail').addEventListener('blur', function () {
         validateEmail(this);
     });
//INPUT VALIDATION


    // <!-----MOBILE CELLNO CHANGE JS----->
    document.addEventListener('DOMContentLoaded', function() {
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(window.location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    
        var mobile = getParameterByName('cellno');
        console.log(`cell no: ${mobile}`); // Debugging log
    
        var callLink = document.getElementById('click_to_call');
        
        console.log(`callLink: ${callLink}`);
    
        if (mobile) {
            var phoneNumber = mobile.startsWith('+91') ? mobile : '+91' + mobile;
            callLink.href = "tel:" + phoneNumber;
            var formattedNumber = phoneNumber.slice(0, 3) + " " + phoneNumber.slice(3, 7) + " " + phoneNumber.slice(7, 10) + " " + phoneNumber.slice(10);
            console.log(`Formatted Number: ${formattedNumber}`); // Debugging log
        }
    });

    // <!-----MOBILE CELLNO CHANGE JS----->



    //SEARCH PARAMS + CHECKBOX SELECT

    $(document).ready(function () {
       
        // Function to get URL parameters
        function getUrlParameter(name) {
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
            const results = regex.exec(window.location.href);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    
        // Function to show table data for a given project
        function showTableForProject(projectName) {
            $('table thead th').each(function (index) {
                if ($(this).text().trim() === projectName) {
                    $(this).show(); // Show the header
                    $('table tbody td:nth-child(' + (index + 1) + ')').show(); // Show the column data
                }
            });
        }
    
        // Function to hide table data for a given project
        function hideTableForProject(projectName) {
            $('table thead th').each(function (index) {
                if ($(this).text().trim() === projectName) {
                    $(this).hide(); // Hide the header
                    $('table tbody td:nth-child(' + (index + 1) + ')').hide(); // Hide the column data
                }
            });
        }
    
        // Function to initialize the table display
        function initializeTable() {
            // Hide all table headers and data initially
            $('table thead th').hide();
            $('table tbody td').hide();
    
            // Always show the first column (e.g., serial numbers or static header)
            $('table thead th').eq(0).show();
            $('table tbody td:nth-child(1)').show();
        }
    
        // Initialize the table display
        initializeTable();
    
        // Get the project parameter from the URL
        const projectParam = getUrlParameter('project');
    
        if (projectParam) {
            // Automatically check the checkbox for the project parameter
            $('.card').each(function () {
                const projectName = $(this).find('h5').text().trim();
                if (projectName === projectParam) {
                    $(this).find('.form-check-input').prop('checked', true); // Check the checkbox
                    showTableForProject(projectName); // Show the table header and data for the project
                    return false; // Exit the loop
                }
            });
    
            // Always show Dream Diamond table header and data
            showTableForProject('Dream Diamond'); 

            // When any other project param is searched, the disabled class for Emami Aastha is removed when it is enabled
            $("#flexCheckChecked").removeClass("discheck");
    
            // Enable the checkbox for Emami Aastha
            $('.card').each(function () {
                const projectName = $(this).find('h5').text().trim();
                if (projectName === 'Emami Aastha') {
                    $(this).find('.form-check-input').prop('disabled', false); // Enable the checkbox
                    return false; // Exit the loop
                }
            });
        } else {
            // If no parameters are passed, show Dream Diamond and Emami Aastha by default
            showTableForProject('Dream Diamond');
            showTableForProject('Emami Aastha');
        }
    
        // Add event listener for checkbox changes
        $('.form-check-input').on('change', function () {
            const checkedCheckboxes = $('.form-check-input:checked');
            const projectName = $(this).closest('.card-body').find('h5').text().trim();
    
            if (checkedCheckboxes.length > 2) {
                // Prevent more than 3 checkboxes from being checked
                alert('You can select up to 2 projects only.');
                $(this).prop('checked', false);
                return;
            }
    
            if ($(this).is(':checked')) {
                // Show the table header and data for the selected project
                showTableForProject(projectName);
               
            } else {
                // Hide the table header and data for the unchecked project
                hideTableForProject(projectName);
            }
        });
    });

    //SEARCH PARAMS + CHECKBOX SELECT


	// MULTIPLE CHECKBOX FUNCTION
		// $(document).ready(function () {
        //     // Initially hide all table headers and columns apart from Emami Aastha and Dream Diamond
        //     $('table thead th:gt(2)').hide(); // Hide headers starting from the third column
        //     $('table tbody tr').each(function () {
        //         $(this).children('td:gt(1)').hide(); // Hide columns starting from the third column
        //     });

        //     // Function to toggle visibility of table columns
        //     function toggleColumns() {
        //         // Hide all columns and headers apart from Emami Aastha and Dream Diamond
        //         $('table thead th:gt(2)').hide();
        //         $('table tbody tr').each(function () {
        //             $(this).children('td:gt(1)').hide();
        //         });

        //         // Get all checked checkboxes
        //         const checkedCheckboxes = $('.form-check-input:checked').not('#flexCheckChecked, #flexCheckChecked2');

        //         // Check if more than 2 checkboxes are selected
        //         if (checkedCheckboxes.length > 2) {
        //             alert('You can select a maximum of 2 options.');
        //             checkedCheckboxes.last().prop('checked', false); // Uncheck the last checked checkbox
        //             return;
        //         }

        //         // Show corresponding columns for checked checkboxes
        //         checkedCheckboxes.each(function () {
        //             const columnIndex = $('.form-check-input').index(this) - 2; // Calculate column index (offset by 2 for Emami Aastha and Dream Diamond)
        //             $('table thead th').eq(columnIndex + 3).show(); // Show the corresponding header
        //             $('table tbody tr').each(function () {
        //                 $(this).children(`td:eq(${columnIndex + 2})`).show(); // Show the corresponding column
        //             });
        //         });
        //     }

        //     // Attach change event listener to checkboxes
        //     $('.form-check-input').not('#flexCheckChecked, #flexCheckChecked2').on('change', toggleColumns);

        //     // Initialize table state
        //     toggleColumns();
        // });
	// MULTIPLE CHECKBOX FUNCTION


 


//SEARCH PARAMS

// $(document).ready(function () {
//     // Function to get URL parameters
//     function getUrlParameter(name) {
//         name = name.replace(/[\[\]]/g, '\\$&');
//         const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
//         const results = regex.exec(window.location.href);
//         if (!results) return null;
//         if (!results[2]) return '';
//         return decodeURIComponent(results[2].replace(/\+/g, ' '));
//     }

//     // Function to toggle table columns
//     function toggleColumns(project) {
//         // Hide all table headers and columns
//         $('table thead th').hide();
//         $('table tbody tr').each(function () {
//             $(this).children('td').hide();
//         });

//         // Always show "Dream Diamond" column
//         $('table thead th').eq(0).show(); // Show the # header
//         $('table thead th').eq(2).show(); // Show the Dream Diamond header
//         $('table tbody tr').each(function () {
//             $(this).children('td:eq(1)').show(); // Show the Dream Diamond data
//         });

//         // If a project is specified in the URL, show its corresponding column
//         if (project) {
//             $('.form-check-input').each(function (index) {
//                 const projectName = $(this).closest('.card-body').find('h5').text().trim();
//                 if (projectName === project) {
//                     const columnIndex = index - 2; // Calculate column index (offset by 2 for initial columns)
//                     $('table thead th').eq(columnIndex + 3).show(); // Show the corresponding header
//                     $('table tbody tr').each(function () {
//                         $(this).children(`td:eq(${columnIndex + 2})`).show(); // Show the corresponding column data
//                     });
//                     return false; // Break the loop
//                 }
//             });
//         } else {
//             // If no project is specified, also show "Emami Aastha"
//             $('table thead th').eq(1).show(); // Show the Emami Aastha header
//             $('table tbody tr').each(function () {
//                 $(this).children('td:eq(0)').show(); // Show the Emami Aastha data
//             });
//         }
//     }

//     // Get the project parameter from the URL
//     const projectParam = getUrlParameter('project');

//     // Initialize table with "Dream Diamond" and either the specified project or "Emami Aastha"
//     toggleColumns(projectParam);
// });

//SEARCH PARAMS


