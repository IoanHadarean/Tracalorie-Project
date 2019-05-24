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
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookie', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    };
    
    // Public methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Calories to number
            calories = parseInt(calories);
            
            // Create new item
            const item =  new Item(ID, name, calories);
            
            // Add to items array
            data.items.push(item);
            
            return item;
        },
        getTotalCalories: function() {
            let total = 0;
            
            // Loop through items and add cals
            data.items.forEach(function(item) {
                total += item.calories;
            });
            
            // Set total cal in data structure
            data.totalCalories = total;
            
            // Return total
            return data.totalCalories;
            
        },
        logData: function() {
            return data;
        }
    };
})();

// UI Controller
const UICtrl = (function() {
    
    const UISelectors = {
        ItemList: '#item-list',
        AddBtn: '.add-btn',
        UpdateBtn: '.update-btn',
        DeleteBtn: '.delete-btn',
        BackBtn: '.back-btn',
        ItemNameInput: '#item-name',
        ItemCaloriesInput: "#item-calories",
        TotalCalories: '.total-calories'
    };
    
    // Public methods
    return {
        populateItemList: function(items) {
            
            // Insert items into item list(UI)
            let itemList = document.querySelector(UISelectors.ItemList);
            items.forEach(function(item) {
                itemList.innerHTML += `<li id = "item-${item.id}" class = "collection-item">
                         <strong>${item.name}</strong> <em></em>${item.calories}
                         <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                         </a>
                         </li>`;
            });
        },
        addListItem: function(item) {
            // Show the list
            document.querySelector(UISelectors.ItemList).style.display = 'block';
            
            // Insert item into item list(UI)
            let itemList = document.querySelector(UISelectors.ItemList);
            itemList.innerHTML += `<li id = "item-${item.id}" class = "collection-item">
                         <strong>${item.name}</strong> <em></em>${item.calories}
                         <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                         </a>
                         </li>`;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.ItemNameInput).value,
                calories: document.querySelector(UISelectors.ItemCaloriesInput).value
            };
        },
        clearInput: function() {
            // Clear input fields
            document.querySelector(UISelectors.ItemNameInput).value = '';
            document.querySelector(UISelectors.ItemCaloriesInput).value = '';
        },
        hideList: function() {
            document.querySelector(UISelectors.ItemList).style.display = 'none';
        },
        addTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.TotalCalories).innerHTML = totalCalories;
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.UpdateBtn).style.display = 'none';
            document.querySelector(UISelectors.DeleteBtn).style.display = 'none';
            document.querySelector(UISelectors.BackBtn).style.display = 'none';
             document.querySelector(UISelectors.AddBtn).style.display = 'inline';
        },
        getSelectors: function() {
            return UISelectors;
        }
    };
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners =  function() {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();
        
        // Add item event
        document.querySelector(UISelectors.AddBtn).addEventListener('click', itemAddSubmit);
        
        // Edit icon click event
        document.querySelector(UISelectors.ItemList).addEventListener('click', itemUpdateSubmit);
        
    };
    
    // Add item submit
    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input =  UICtrl.getItemInput();
        
        // Check for name and calories input
        if(input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            
            // Add item to UI list
            UICtrl.addListItem(newItem);
            
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add total calories to UI
            UICtrl.addTotalCalories(totalCalories);
            
            // Clear form fields
            UICtrl.clearInput();
        }
        
        e.preventDefault();
    };
    
    // Update item submit
    const itemUpdateSubmit = function(e) {
        if (e.target.classList.contains('edit-item')) {
            console.log(e.target);
        }
        e.preventDefault();
    };
    
    
    // Public methods
    return {
        init: function() {
            // Clear edit state / set initial state
            UICtrl.clearEditState();
            
            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            }else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }
            
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add total calories to UI
            UICtrl.addTotalCalories(totalCalories);
            
            // Load event listeners
            loadEventListeners();
        }
    };
    
    
})(ItemCtrl, UICtrl);

// Initialize App
AppCtrl.init();