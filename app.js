// Storage Controller

// Item Controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };
    
    // Data Structure / State
    const data = {
        items: [ 
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    };
    
    // Public methods
    return {
        getItems: function() {
            return data.items;
        },
        logData: function() {
            return data;
        }
    };
})();

// UI Controller
const UICtrl = (function() {
    
    // Public methods
    return {
        populateItemList: function(items) {
            
            // Insert items into item list
            let itemList = document.getElementById('item-list');
            items.forEach(function(item) {
                itemList.innerHTML += `<li id = "item-${item.id}" class = "collection-item">
                         <strong>${item.name}</strong> <em></em>${item.calories}
                         <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                         </a>
                         </li>`;
            });
        }
    };
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
    
    // Public methods
    return {
        init: function() {
            
            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Populate list with items
            UICtrl.populateItemList(items);
        }
    };
    
    
})(ItemCtrl, UICtrl);

// Initialize App
AppCtrl.init();