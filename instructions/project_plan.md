We are building a santa wishlist creation app. This is a simpel website with 3 pages:

1. Home page
2. Wishlist page (which will use a URL param to get the wishlist id for a parents account)
3. Admin page (which allows parents to create a wishlist page for their child)

Its very simple, a parent will create an account, they will then build a wishlist page for their child. They will then share the wishlist page with their child. The child will then be able to view the wishlist page and add items to the wishlist. The parent will then be able to view the wishlist and see the items that have been added. (eventually we will paywall the wishlist responses but now yet). 

#ADMIN PAGE
The admin page will be simple, it will allow the parent to:
1. Create a wishlist page for their child
2. Preview the wishlist page
3. View the responses to the wishlist page

#WISHLIST PAGE
The wishlist page will be a seperate page, this is the page the KIDS will see, so it needs to look magical, and will be designed to look snowy and christmasy with simple animations and a nice background. This page will ideally have a background area that allows the kids to write out their wishlist message to send to santa. I want it to look like when I type im typing in snow

For this page to work and to make sure the childs wishlist is seperate to every other families, this wishlist is unique to the parents account, the wishlist page has the ID of the wishlist in the URL, this ID is used when saving the wishlist to the datababase, it takes the ID. That way the ADMIN PAGE can view only the responses for that wishlist.

There will be a send button to send the wishlist to santa, once the wishlist has been sent, it will show a fun message to the child that their wishlist has been sent to santa! We need to make sure theres a thing that makes sure the child is happy with their wishlist before they send it to santa, with a fun message saying the elves want to make sure the child is happy with their wishlist before they send it to santa.


#STYLING
the styling of the wishlist page needs to look like a sleepy snowy villiage at night, there will be midnight colours, it needs to feel magical for the child. it should have snowfall animation, heres a nice one:
https://codepen.io/alphardex/pen/dyPorwJ

The snow should fall over the page, but not impede the useage of the page, where the user can type out their wishlist message. For now the wishlist message area needs to be either 1. a background image (i think this is the best way to do it, i was going to make it look like a piece of paper, but i imagine we cant code that in , we'd need to use an image?) or 2. If we can code CSS of a snowy area, almost like snow on the floor, and when i type it looks like its indented in the snow
