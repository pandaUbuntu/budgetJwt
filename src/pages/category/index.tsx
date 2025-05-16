
import CategorySide from '../../components/CategorySide';
import TransationSide from '../../components/TransactionSide';
import PageLayout from '../../layout/PageLayout';
import './style.css'

function CategoryPage() {
  return (
    <>
      <PageLayout>
        <div className="container">
          <div className='category-side'>
            <h2>Category Side</h2>
            <CategorySide />
          </div>
          <div className='transaction-side'>
            <h2>Transaction Side</h2>
            <TransationSide />
          </div>
        </div>
      </PageLayout>
    </>
  )
}

export default CategoryPage
