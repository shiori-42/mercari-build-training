/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

int countlen(struct ListNode *head){
    int len=0;
    while(head){
        head=head->next;
        len++;
    }
    return len;
} 

struct ListNode *getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    int lenA=countlen(headA);
    int lenB=countlen(headB);

    while(lenA>lenB){
        headA=headA->next;
        lenA--;
    }
    while(lenB>lenA){
        headB=headB->next;
        lenB--;
    }
    while(headA!=headB){
        headA=headA->next;
        headB=headB->next;
    }
    return headA;
}