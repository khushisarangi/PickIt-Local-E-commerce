let map; // Define map variable in the global scope
let currentCategory = null; // Track the currently displayed category
let markers = []; // Array to store all markers

// Function to initialize the map
function initMap(userLocation, category) {
  // If map is already initialized, clear it
  if (map) {
    map.remove();
    markers = [];
  }
  // Define the boundaries for India
  const bounds = [
    [6.75, 68.16], // Southwest coordinates
    [35.5, 97.4], // Northeast coordinates
  ];
  // Initialize the map with OpenStreetMap tile layer and set boundaries
  map = L.map("map").setView(
    [userLocation.latitude, userLocation.longitude],
    10
  );
  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  // Set map boundaries
  map.setMaxBounds(bounds);
  map.on("drag", function () {
    map.panInsideBounds(bounds, { animate: false });
  });
  // Create a red marker for the user's current location
  const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
    icon: L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  }).addTo(map);
  // Add popup to user's marker
  userMarker.bindPopup("Your Location").openPopup();

  // Generate mock vendors for the selected category near the user's location
  const mockVendors = generateMockVendors(category, userLocation);
  // Add markers for mock vendors
  mockVendors.forEach((vendor) => {
    const marker = L.marker(vendor.latlng).addTo(map);

    // Add shop details to marker
    marker.shopDetails = {
      name: vendor.name,
      category: vendor.category,
      address: vendor.address,
    };

    // Add popup to marker
    marker.bindPopup(
      `<b>${vendor.name}</b><br>${vendor.category}<br>${vendor.address}`
    );

    // Add click event listener to the marker
    marker.on("click", function (event) {
      // Retrieve shop details from the marker's data
      const details = event.target.shopDetails;

      // Construct the URL for the vendor details page (replace 'vendor-details.html' with the actual page URL)
      const url = `vendor-details.html?name=${encodeURIComponent(
        details.name
      )}&category=${encodeURIComponent(
        details.category
      )}&address=${encodeURIComponent(details.address)}`;

      // Redirect to the vendor details page
      window.location.href = url;
    });

    markers.push(marker); // Add the marker to the markers array
  });

  

}

// Function to generate mock vendor data for a given category and user's location
function generateMockVendors(category, userLocation) {
  const mockVendors = [];
  for (let i = 0; i < 25; i++) {
    const [latitude, longitude] = generateRandomCoordinates(
      userLocation.latitude,
      userLocation.longitude,
      5
    ); // Generating within 5 km radius
    mockVendors.push({
      name: `${category} Vendor ${i + 1}`,
      category: category,
      latlng: [latitude, longitude],
      address: `Address ${i + 1}, City`,
    });
  }
  return mockVendors;
}

// Function to generate random latitude and longitude within a certain radius from a given location
function generateRandomCoordinates(latitude, longitude, radiusInKm) {
  const earthRadius = 6371; // Earth's radius in kilometers
  const randomRadius = Math.random() * radiusInKm;
  const randomAngle = Math.random() * 2 * Math.PI;
  const latitudeOffset = Math.cos(randomAngle) * randomRadius;
  const longitudeOffset = Math.sin(randomAngle) * randomRadius;
  const newLatitude =
    latitude + (latitudeOffset / earthRadius) * (180 / Math.PI);
  const newLongitude =
    longitude +
    (longitudeOffset / (earthRadius * Math.cos((Math.PI / 180) * latitude))) *
      (180 / Math.PI);
  return [newLatitude, newLongitude];
}

// Function to get the user's current location when a category is clicked
function getCategoryVendors(category) {
  // Get user's current location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      // Initialize the map with the user's location and selected category
      initMap(userLocation, category);
      // Update the current category
      currentCategory = category;
    },
    function (error) {
      console.error("Error getting user location:", error);
    }
  );
}
// Function to handle marker clicks and redirect to vendor-details.html
function redirectToVendorDetails(vendor) {
  // Construct the URL with query parameters for the vendor details
  const url = `vendor-details.html?name=${encodeURIComponent(
    vendor.name
  )}&category=${encodeURIComponent(
    vendor.category
  )}&address=${encodeURIComponent(vendor.address)}`;
  // Redirect to vendor-details.html
  window.location.href = url;
}

// Now you can add the marker click event listener below this function

// Function to clear the map
function clearMap() {
  // Loop through all markers and remove them
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
  // Clear the markers array
  markers = [];
}

// Add event listeners for each category
document.getElementById("fruits").addEventListener("click", function () {
  // If the current category is different from fruits, load fruits
  if (currentCategory !== "Fruits") {
    getCategoryVendors("Fruits");
  }
});

document.getElementById("snacks").addEventListener("click", function () {
  // If the current category is different from snacks, load snacks
  if (currentCategory !== "Snacks") {
    getCategoryVendors("Snacks");
  }
});

document.getElementById("veggies").addEventListener("click", function () {
  // If the current category is different from veggies, load veggies
  if (currentCategory !== "Veggies") {
    getCategoryVendors("Veggies");
  }
});



document.getElementById('bargainButton').addEventListener('click', function() {
    alert('Request for bargain sent to all vendors');
});





// Add this function to script.js
function sendBargainRequest() {
  // Display a popup message
  alert("Request for bargain sent to all vendors.");
}




// Modify the getCategoryVendors function to handle multiple range options
function getCategoryVendors(category, range) {
  // Get user's current location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      // Initialize the map with the user's location and selected category for the specified range
      initMap(userLocation, category, range);
      // Update the current category
      currentCategory = category;
    },
    function (error) {
      console.error("Error getting user location:", error);
    }
  );
}


// Modify initMap function to accept range parameter
function initMap(userLocation, category, range) {
  // If map is already initialized, clear it
  if (map) {
    map.remove();
    markers = [];
  }
  // Define the boundaries for India
  const bounds = [
    [6.75, 68.16], // Southwest coordinates
    [35.5, 97.4], // Northeast coordinates
  ];
  // Initialize the map with OpenStreetMap tile layer and set boundaries
  map = L.map("map").setView(
    [userLocation.latitude, userLocation.longitude],
    10
  );
  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  // Set map boundaries
  map.setMaxBounds(bounds);
  map.on("drag", function () {
    map.panInsideBounds(bounds, { animate: false });
  });
  // Create a red marker for the user's current location
  const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
    icon: L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  }).addTo(map);
  // Add popup to user's marker
  userMarker.bindPopup("Your Location").openPopup();

  // Generate mock vendors for the selected category near the user's location within the specified range
  const mockVendors = generateMockVendors(category, userLocation, range);
  // Add markers for mock vendors
  mockVendors.forEach((vendor) => {
    const marker = L.marker(vendor.latlng).addTo(map);

    // Add shop details to marker
    marker.shopDetails = {
      name: vendor.name,
      category: vendor.category,
      address: vendor.address,
    };

    // Add popup to marker
    marker.bindPopup(
      `<b>${vendor.name}</b><br>${vendor.category}<br>${vendor.address}`
    );

    // Add click event listener to the marker
    marker.on("click", function (event) {
      // Retrieve shop details from the marker's data
      const details = event.target.shopDetails;

      // Construct the URL for the vendor details page (replace 'vendor-details.html' with the actual page URL)
      const url = `vendor-details.html?name=${encodeURIComponent(
        details.name
      )}&category=${encodeURIComponent(
        details.category
      )}&address=${encodeURIComponent(details.address)}`;

      // Redirect to the vendor details page
      window.location.href = url;
    });

    markers.push(marker); // Add the marker to the markers array
  });
}

// Modify the event listeners for each category to call getCategoryVendors with range parameter
document.getElementById("fruits").addEventListener("click", function () {
  // If the current category is different from fruits, load fruits
  if (currentCategory !== "Fruits") {
    getCategoryVendors("Fruits", 5); // 5km range for fruits
  }
});

document.getElementById("snacks").addEventListener("click", function () {
  // If the current category is different from snacks, load snacks
  if (currentCategory !== "Snacks") {
    getCategoryVendors("Snacks", 5); // 5km range for snacks
  }
});

document.getElementById("veggies").addEventListener("click", function () {
  // If the current category is different from veggies, load veggies
  if (currentCategory !== "Veggies") {
    getCategoryVendors("Veggies", 5); // 5km range for veggies
  }
});




